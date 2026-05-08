import bcrypt from 'bcryptjs';
import db from '@/lib/prisma';
import type { HousehoodRole, HousehoodUser } from '@/lib/househood/types';

export const HOUSEHOOD_ROLES = ['resident', 'manager', 'operations'] as const satisfies readonly HousehoodRole[];

type RawHousehoodRoleRow = {
  role: string;
};

function toHousehoodUser(user: { id: string; email: string }, role: HousehoodRole): HousehoodUser {
  return {
    id: user.id,
    email: user.email,
    role,
  };
}

export function isHousehoodRole(value: string): value is HousehoodRole {
  return HOUSEHOOD_ROLES.includes(value as HousehoodRole);
}

export async function getHousehoodRoleByUserId(userId: string): Promise<HousehoodRole | null> {
  const rows = await db.$queryRaw<RawHousehoodRoleRow[]>`
    SELECT role::text AS role
    FROM "HousehoodAccount"
    WHERE "userId" = ${userId}
    LIMIT 1
  `;

  const role = rows[0]?.role;
  return role && isHousehoodRole(role) ? role : null;
}

export async function getHousehoodUserById(userId: string): Promise<HousehoodUser | null> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true },
  });

  if (!user) {
    return null;
  }

  const role = await getHousehoodRoleByUserId(user.id);
  if (!role) {
    return null;
  }

  return toHousehoodUser(user, role);
}

export async function authenticateHousehoodUser(email: string, password: string): Promise<HousehoodUser | null> {
  const user = await db.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  if (!user) {
    return null;
  }

  const role = await getHousehoodRoleByUserId(user.id);
  if (!role) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  return toHousehoodUser(user, role);
}

export async function registerHousehoodUser(email: string, password: string, role: HousehoodRole): Promise<HousehoodUser> {
  const existingUser = await db.user.findUnique({
    where: { email },
    select: { id: true, email: true },
  });

  if (existingUser) {
    const existingRole = await getHousehoodRoleByUserId(existingUser.id);
    if (existingRole) {
      throw new Error('A Househood account already exists for this email.');
    }
    throw new Error('This email is already in use by another Underdecanopy account.');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });

    await tx.$executeRaw`
      INSERT INTO "HousehoodAccount" ("userId", "role", "createdAt", "updatedAt")
      VALUES (${user.id}, CAST(${role} AS "HousehoodRole"), NOW(), NOW())
    `;

    return user;
  });

  return toHousehoodUser(createdUser, role);
}
