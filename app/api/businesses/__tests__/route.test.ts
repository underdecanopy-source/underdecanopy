/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { GET, POST } from '../route';
import { getUser } from '@/lib/auth/server';
import db from '@/lib/prisma';

jest.mock('@/lib/auth/server', () => ({
  getUser: jest.fn(),
}));

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    businessMembership: {
      findMany: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

const mockedGetUser = jest.mocked(getUser);
const mockedDb = jest.mocked(db);

describe('/api/businesses', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('requires an authenticated user to list businesses', async () => {
    mockedGetUser.mockResolvedValue(null);

    const response = await GET();

    expect(response.status).toBe(401);
    expect(mockedDb.businessMembership.findMany).not.toHaveBeenCalled();
  });

  it('requires an authenticated user to create a business', async () => {
    mockedGetUser.mockResolvedValue(null);
    const request = new NextRequest('http://localhost/api/businesses', {
      method: 'POST',
      body: JSON.stringify({ name: 'Corner Store' }),
      headers: { 'content-type': 'application/json' },
    });

    const response = await POST(request);

    expect(response.status).toBe(401);
    expect(mockedDb.$transaction).not.toHaveBeenCalled();
  });

  it('limits the business list to the authenticated user memberships', async () => {
    mockedGetUser.mockResolvedValue({ id: 'auth-user-1' } as Awaited<ReturnType<typeof getUser>>);
    mockedDb.businessMembership.findMany.mockResolvedValue([]);

    const response = await GET();

    expect(response.status).toBe(200);
    expect(mockedDb.businessMembership.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { authUserId: 'auth-user-1' } }),
    );
  });

  it('validates business input before opening a database transaction', async () => {
    mockedGetUser.mockResolvedValue({ id: 'auth-user-1' } as Awaited<ReturnType<typeof getUser>>);
    const request = new NextRequest('http://localhost/api/businesses', {
      method: 'POST',
      body: JSON.stringify({ name: '   ' }),
      headers: { 'content-type': 'application/json' },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(mockedDb.$transaction).not.toHaveBeenCalled();
  });

  it('creates the business, owner membership, and audit record atomically', async () => {
    mockedGetUser.mockResolvedValue({ id: 'auth-user-1' } as Awaited<ReturnType<typeof getUser>>);
    const business = { id: 'business-1', name: 'Corner Store' };
    const tx = {
      business: { create: jest.fn().mockResolvedValue(business) },
      businessMembership: { create: jest.fn().mockResolvedValue({}) },
      auditLog: { create: jest.fn().mockResolvedValue({}) },
    };
    mockedDb.$transaction.mockImplementation(async (callback) => {
      if (typeof callback !== 'function') throw new Error('Expected transaction callback');
      return callback(tx as never);
    });
    const request = new NextRequest('http://localhost/api/businesses', {
      method: 'POST',
      body: JSON.stringify({ name: ' Corner Store ', businessType: 'Retail' }),
      headers: { 'content-type': 'application/json' },
    });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(201);
    expect(responseBody).toEqual(business);
    expect(tx.business.create).toHaveBeenCalledWith({
      data: { name: 'Corner Store', businessType: 'Retail' },
    });
    expect(tx.businessMembership.create).toHaveBeenCalledWith({
      data: { businessId: 'business-1', authUserId: 'auth-user-1', role: 'OWNER' },
    });
    expect(tx.auditLog.create).toHaveBeenCalledWith({
      data: {
        businessId: 'business-1',
        actorAuthUserId: 'auth-user-1',
        action: 'BUSINESS_CREATED',
        entity: 'Business',
        entityId: 'business-1',
      },
    });
  });
});
