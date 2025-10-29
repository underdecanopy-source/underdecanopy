
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model ServiceRequest
 * 
 */
export type ServiceRequest = $Result.DefaultSelection<Prisma.$ServiceRequestPayload>
/**
 * Model TrainingCourse
 * 
 */
export type TrainingCourse = $Result.DefaultSelection<Prisma.$TrainingCoursePayload>
/**
 * Model BusinessRegistration
 * 
 */
export type BusinessRegistration = $Result.DefaultSelection<Prisma.$BusinessRegistrationPayload>
/**
 * Model CafeMenuItem
 * 
 */
export type CafeMenuItem = $Result.DefaultSelection<Prisma.$CafeMenuItemPayload>
/**
 * Model NewsletterSubscription
 * 
 */
export type NewsletterSubscription = $Result.DefaultSelection<Prisma.$NewsletterSubscriptionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceRequest`: Exposes CRUD operations for the **ServiceRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceRequests
    * const serviceRequests = await prisma.serviceRequest.findMany()
    * ```
    */
  get serviceRequest(): Prisma.ServiceRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainingCourse`: Exposes CRUD operations for the **TrainingCourse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainingCourses
    * const trainingCourses = await prisma.trainingCourse.findMany()
    * ```
    */
  get trainingCourse(): Prisma.TrainingCourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.businessRegistration`: Exposes CRUD operations for the **BusinessRegistration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BusinessRegistrations
    * const businessRegistrations = await prisma.businessRegistration.findMany()
    * ```
    */
  get businessRegistration(): Prisma.BusinessRegistrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cafeMenuItem`: Exposes CRUD operations for the **CafeMenuItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CafeMenuItems
    * const cafeMenuItems = await prisma.cafeMenuItem.findMany()
    * ```
    */
  get cafeMenuItem(): Prisma.CafeMenuItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.newsletterSubscription`: Exposes CRUD operations for the **NewsletterSubscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewsletterSubscriptions
    * const newsletterSubscriptions = await prisma.newsletterSubscription.findMany()
    * ```
    */
  get newsletterSubscription(): Prisma.NewsletterSubscriptionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Service: 'Service',
    ServiceRequest: 'ServiceRequest',
    TrainingCourse: 'TrainingCourse',
    BusinessRegistration: 'BusinessRegistration',
    CafeMenuItem: 'CafeMenuItem',
    NewsletterSubscription: 'NewsletterSubscription'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "service" | "serviceRequest" | "trainingCourse" | "businessRegistration" | "cafeMenuItem" | "newsletterSubscription"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      ServiceRequest: {
        payload: Prisma.$ServiceRequestPayload<ExtArgs>
        fields: Prisma.ServiceRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>
          }
          findFirst: {
            args: Prisma.ServiceRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>
          }
          findMany: {
            args: Prisma.ServiceRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>[]
          }
          create: {
            args: Prisma.ServiceRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>
          }
          createMany: {
            args: Prisma.ServiceRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>[]
          }
          delete: {
            args: Prisma.ServiceRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>
          }
          update: {
            args: Prisma.ServiceRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>
          }
          deleteMany: {
            args: Prisma.ServiceRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>[]
          }
          upsert: {
            args: Prisma.ServiceRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>
          }
          aggregate: {
            args: Prisma.ServiceRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceRequest>
          }
          groupBy: {
            args: Prisma.ServiceRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceRequestCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceRequestCountAggregateOutputType> | number
          }
        }
      }
      TrainingCourse: {
        payload: Prisma.$TrainingCoursePayload<ExtArgs>
        fields: Prisma.TrainingCourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainingCourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingCoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainingCourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingCoursePayload>
          }
          findFirst: {
            args: Prisma.TrainingCourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingCoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainingCourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingCoursePayload>
          }
          findMany: {
            args: Prisma.TrainingCourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingCoursePayload>[]
          }
          create: {
            args: Prisma.TrainingCourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingCoursePayload>
          }
          createMany: {
            args: Prisma.TrainingCourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainingCourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingCoursePayload>[]
          }
          delete: {
            args: Prisma.TrainingCourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingCoursePayload>
          }
          update: {
            args: Prisma.TrainingCourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingCoursePayload>
          }
          deleteMany: {
            args: Prisma.TrainingCourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainingCourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainingCourseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingCoursePayload>[]
          }
          upsert: {
            args: Prisma.TrainingCourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingCoursePayload>
          }
          aggregate: {
            args: Prisma.TrainingCourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainingCourse>
          }
          groupBy: {
            args: Prisma.TrainingCourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainingCourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainingCourseCountArgs<ExtArgs>
            result: $Utils.Optional<TrainingCourseCountAggregateOutputType> | number
          }
        }
      }
      BusinessRegistration: {
        payload: Prisma.$BusinessRegistrationPayload<ExtArgs>
        fields: Prisma.BusinessRegistrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusinessRegistrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessRegistrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusinessRegistrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessRegistrationPayload>
          }
          findFirst: {
            args: Prisma.BusinessRegistrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessRegistrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusinessRegistrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessRegistrationPayload>
          }
          findMany: {
            args: Prisma.BusinessRegistrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessRegistrationPayload>[]
          }
          create: {
            args: Prisma.BusinessRegistrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessRegistrationPayload>
          }
          createMany: {
            args: Prisma.BusinessRegistrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BusinessRegistrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessRegistrationPayload>[]
          }
          delete: {
            args: Prisma.BusinessRegistrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessRegistrationPayload>
          }
          update: {
            args: Prisma.BusinessRegistrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessRegistrationPayload>
          }
          deleteMany: {
            args: Prisma.BusinessRegistrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusinessRegistrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BusinessRegistrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessRegistrationPayload>[]
          }
          upsert: {
            args: Prisma.BusinessRegistrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessRegistrationPayload>
          }
          aggregate: {
            args: Prisma.BusinessRegistrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusinessRegistration>
          }
          groupBy: {
            args: Prisma.BusinessRegistrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusinessRegistrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusinessRegistrationCountArgs<ExtArgs>
            result: $Utils.Optional<BusinessRegistrationCountAggregateOutputType> | number
          }
        }
      }
      CafeMenuItem: {
        payload: Prisma.$CafeMenuItemPayload<ExtArgs>
        fields: Prisma.CafeMenuItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CafeMenuItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CafeMenuItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CafeMenuItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CafeMenuItemPayload>
          }
          findFirst: {
            args: Prisma.CafeMenuItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CafeMenuItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CafeMenuItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CafeMenuItemPayload>
          }
          findMany: {
            args: Prisma.CafeMenuItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CafeMenuItemPayload>[]
          }
          create: {
            args: Prisma.CafeMenuItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CafeMenuItemPayload>
          }
          createMany: {
            args: Prisma.CafeMenuItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CafeMenuItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CafeMenuItemPayload>[]
          }
          delete: {
            args: Prisma.CafeMenuItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CafeMenuItemPayload>
          }
          update: {
            args: Prisma.CafeMenuItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CafeMenuItemPayload>
          }
          deleteMany: {
            args: Prisma.CafeMenuItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CafeMenuItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CafeMenuItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CafeMenuItemPayload>[]
          }
          upsert: {
            args: Prisma.CafeMenuItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CafeMenuItemPayload>
          }
          aggregate: {
            args: Prisma.CafeMenuItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCafeMenuItem>
          }
          groupBy: {
            args: Prisma.CafeMenuItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<CafeMenuItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.CafeMenuItemCountArgs<ExtArgs>
            result: $Utils.Optional<CafeMenuItemCountAggregateOutputType> | number
          }
        }
      }
      NewsletterSubscription: {
        payload: Prisma.$NewsletterSubscriptionPayload<ExtArgs>
        fields: Prisma.NewsletterSubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewsletterSubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewsletterSubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          findFirst: {
            args: Prisma.NewsletterSubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewsletterSubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          findMany: {
            args: Prisma.NewsletterSubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>[]
          }
          create: {
            args: Prisma.NewsletterSubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          createMany: {
            args: Prisma.NewsletterSubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NewsletterSubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>[]
          }
          delete: {
            args: Prisma.NewsletterSubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          update: {
            args: Prisma.NewsletterSubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.NewsletterSubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewsletterSubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NewsletterSubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.NewsletterSubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          aggregate: {
            args: Prisma.NewsletterSubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewsletterSubscription>
          }
          groupBy: {
            args: Prisma.NewsletterSubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsletterSubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewsletterSubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<NewsletterSubscriptionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    service?: ServiceOmit
    serviceRequest?: ServiceRequestOmit
    trainingCourse?: TrainingCourseOmit
    businessRegistration?: BusinessRegistrationOmit
    cafeMenuItem?: CafeMenuItemOmit
    newsletterSubscription?: NewsletterSubscriptionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    serviceRequests: number
    businessRegistrations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceRequests?: boolean | UserCountOutputTypeCountServiceRequestsArgs
    businessRegistrations?: boolean | UserCountOutputTypeCountBusinessRegistrationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountServiceRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBusinessRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessRegistrationWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    serviceRequests: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceRequests?: boolean | ServiceCountOutputTypeCountServiceRequestsArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountServiceRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceRequestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    serviceRequests?: boolean | User$serviceRequestsArgs<ExtArgs>
    businessRegistrations?: boolean | User$businessRegistrationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceRequests?: boolean | User$serviceRequestsArgs<ExtArgs>
    businessRegistrations?: boolean | User$businessRegistrationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      serviceRequests: Prisma.$ServiceRequestPayload<ExtArgs>[]
      businessRegistrations: Prisma.$BusinessRegistrationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    serviceRequests<T extends User$serviceRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$serviceRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    businessRegistrations<T extends User$businessRegistrationsArgs<ExtArgs> = {}>(args?: Subset<T, User$businessRegistrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.serviceRequests
   */
  export type User$serviceRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    where?: ServiceRequestWhereInput
    orderBy?: ServiceRequestOrderByWithRelationInput | ServiceRequestOrderByWithRelationInput[]
    cursor?: ServiceRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceRequestScalarFieldEnum | ServiceRequestScalarFieldEnum[]
  }

  /**
   * User.businessRegistrations
   */
  export type User$businessRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessRegistration
     */
    select?: BusinessRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessRegistration
     */
    omit?: BusinessRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessRegistrationInclude<ExtArgs> | null
    where?: BusinessRegistrationWhereInput
    orderBy?: BusinessRegistrationOrderByWithRelationInput | BusinessRegistrationOrderByWithRelationInput[]
    cursor?: BusinessRegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BusinessRegistrationScalarFieldEnum | BusinessRegistrationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    serviceRequests?: boolean | Service$serviceRequestsArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceRequests?: boolean | Service$serviceRequestsArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      serviceRequests: Prisma.$ServiceRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServiceUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    serviceRequests<T extends Service$serviceRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Service$serviceRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly name: FieldRef<"Service", 'String'>
    readonly description: FieldRef<"Service", 'String'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service updateManyAndReturn
   */
  export type ServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.serviceRequests
   */
  export type Service$serviceRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    where?: ServiceRequestWhereInput
    orderBy?: ServiceRequestOrderByWithRelationInput | ServiceRequestOrderByWithRelationInput[]
    cursor?: ServiceRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceRequestScalarFieldEnum | ServiceRequestScalarFieldEnum[]
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model ServiceRequest
   */

  export type AggregateServiceRequest = {
    _count: ServiceRequestCountAggregateOutputType | null
    _min: ServiceRequestMinAggregateOutputType | null
    _max: ServiceRequestMaxAggregateOutputType | null
  }

  export type ServiceRequestMinAggregateOutputType = {
    id: string | null
    userId: string | null
    serviceId: string | null
    details: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceRequestMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    serviceId: string | null
    details: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceRequestCountAggregateOutputType = {
    id: number
    userId: number
    serviceId: number
    details: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceRequestMinAggregateInputType = {
    id?: true
    userId?: true
    serviceId?: true
    details?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceRequestMaxAggregateInputType = {
    id?: true
    userId?: true
    serviceId?: true
    details?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceRequestCountAggregateInputType = {
    id?: true
    userId?: true
    serviceId?: true
    details?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceRequest to aggregate.
     */
    where?: ServiceRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceRequests to fetch.
     */
    orderBy?: ServiceRequestOrderByWithRelationInput | ServiceRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceRequests
    **/
    _count?: true | ServiceRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceRequestMaxAggregateInputType
  }

  export type GetServiceRequestAggregateType<T extends ServiceRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceRequest[P]>
      : GetScalarType<T[P], AggregateServiceRequest[P]>
  }




  export type ServiceRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceRequestWhereInput
    orderBy?: ServiceRequestOrderByWithAggregationInput | ServiceRequestOrderByWithAggregationInput[]
    by: ServiceRequestScalarFieldEnum[] | ServiceRequestScalarFieldEnum
    having?: ServiceRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceRequestCountAggregateInputType | true
    _min?: ServiceRequestMinAggregateInputType
    _max?: ServiceRequestMaxAggregateInputType
  }

  export type ServiceRequestGroupByOutputType = {
    id: string
    userId: string
    serviceId: string
    details: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ServiceRequestCountAggregateOutputType | null
    _min: ServiceRequestMinAggregateOutputType | null
    _max: ServiceRequestMaxAggregateOutputType | null
  }

  type GetServiceRequestGroupByPayload<T extends ServiceRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceRequestGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceRequestGroupByOutputType[P]>
        }
      >
    >


  export type ServiceRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    serviceId?: boolean
    details?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceRequest"]>

  export type ServiceRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    serviceId?: boolean
    details?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceRequest"]>

  export type ServiceRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    serviceId?: boolean
    details?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceRequest"]>

  export type ServiceRequestSelectScalar = {
    id?: boolean
    userId?: boolean
    serviceId?: boolean
    details?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "serviceId" | "details" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["serviceRequest"]>
  export type ServiceRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ServiceRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ServiceRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $ServiceRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceRequest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      serviceId: string
      details: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["serviceRequest"]>
    composites: {}
  }

  type ServiceRequestGetPayload<S extends boolean | null | undefined | ServiceRequestDefaultArgs> = $Result.GetResult<Prisma.$ServiceRequestPayload, S>

  type ServiceRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceRequestCountAggregateInputType | true
    }

  export interface ServiceRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceRequest'], meta: { name: 'ServiceRequest' } }
    /**
     * Find zero or one ServiceRequest that matches the filter.
     * @param {ServiceRequestFindUniqueArgs} args - Arguments to find a ServiceRequest
     * @example
     * // Get one ServiceRequest
     * const serviceRequest = await prisma.serviceRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceRequestFindUniqueArgs>(args: SelectSubset<T, ServiceRequestFindUniqueArgs<ExtArgs>>): Prisma__ServiceRequestClient<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceRequestFindUniqueOrThrowArgs} args - Arguments to find a ServiceRequest
     * @example
     * // Get one ServiceRequest
     * const serviceRequest = await prisma.serviceRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceRequestClient<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRequestFindFirstArgs} args - Arguments to find a ServiceRequest
     * @example
     * // Get one ServiceRequest
     * const serviceRequest = await prisma.serviceRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceRequestFindFirstArgs>(args?: SelectSubset<T, ServiceRequestFindFirstArgs<ExtArgs>>): Prisma__ServiceRequestClient<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRequestFindFirstOrThrowArgs} args - Arguments to find a ServiceRequest
     * @example
     * // Get one ServiceRequest
     * const serviceRequest = await prisma.serviceRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceRequestClient<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceRequests
     * const serviceRequests = await prisma.serviceRequest.findMany()
     * 
     * // Get first 10 ServiceRequests
     * const serviceRequests = await prisma.serviceRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceRequestWithIdOnly = await prisma.serviceRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceRequestFindManyArgs>(args?: SelectSubset<T, ServiceRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceRequest.
     * @param {ServiceRequestCreateArgs} args - Arguments to create a ServiceRequest.
     * @example
     * // Create one ServiceRequest
     * const ServiceRequest = await prisma.serviceRequest.create({
     *   data: {
     *     // ... data to create a ServiceRequest
     *   }
     * })
     * 
     */
    create<T extends ServiceRequestCreateArgs>(args: SelectSubset<T, ServiceRequestCreateArgs<ExtArgs>>): Prisma__ServiceRequestClient<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceRequests.
     * @param {ServiceRequestCreateManyArgs} args - Arguments to create many ServiceRequests.
     * @example
     * // Create many ServiceRequests
     * const serviceRequest = await prisma.serviceRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceRequestCreateManyArgs>(args?: SelectSubset<T, ServiceRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceRequests and returns the data saved in the database.
     * @param {ServiceRequestCreateManyAndReturnArgs} args - Arguments to create many ServiceRequests.
     * @example
     * // Create many ServiceRequests
     * const serviceRequest = await prisma.serviceRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceRequests and only return the `id`
     * const serviceRequestWithIdOnly = await prisma.serviceRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceRequest.
     * @param {ServiceRequestDeleteArgs} args - Arguments to delete one ServiceRequest.
     * @example
     * // Delete one ServiceRequest
     * const ServiceRequest = await prisma.serviceRequest.delete({
     *   where: {
     *     // ... filter to delete one ServiceRequest
     *   }
     * })
     * 
     */
    delete<T extends ServiceRequestDeleteArgs>(args: SelectSubset<T, ServiceRequestDeleteArgs<ExtArgs>>): Prisma__ServiceRequestClient<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceRequest.
     * @param {ServiceRequestUpdateArgs} args - Arguments to update one ServiceRequest.
     * @example
     * // Update one ServiceRequest
     * const serviceRequest = await prisma.serviceRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceRequestUpdateArgs>(args: SelectSubset<T, ServiceRequestUpdateArgs<ExtArgs>>): Prisma__ServiceRequestClient<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceRequests.
     * @param {ServiceRequestDeleteManyArgs} args - Arguments to filter ServiceRequests to delete.
     * @example
     * // Delete a few ServiceRequests
     * const { count } = await prisma.serviceRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceRequestDeleteManyArgs>(args?: SelectSubset<T, ServiceRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceRequests
     * const serviceRequest = await prisma.serviceRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceRequestUpdateManyArgs>(args: SelectSubset<T, ServiceRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceRequests and returns the data updated in the database.
     * @param {ServiceRequestUpdateManyAndReturnArgs} args - Arguments to update many ServiceRequests.
     * @example
     * // Update many ServiceRequests
     * const serviceRequest = await prisma.serviceRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceRequests and only return the `id`
     * const serviceRequestWithIdOnly = await prisma.serviceRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceRequest.
     * @param {ServiceRequestUpsertArgs} args - Arguments to update or create a ServiceRequest.
     * @example
     * // Update or create a ServiceRequest
     * const serviceRequest = await prisma.serviceRequest.upsert({
     *   create: {
     *     // ... data to create a ServiceRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceRequest we want to update
     *   }
     * })
     */
    upsert<T extends ServiceRequestUpsertArgs>(args: SelectSubset<T, ServiceRequestUpsertArgs<ExtArgs>>): Prisma__ServiceRequestClient<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRequestCountArgs} args - Arguments to filter ServiceRequests to count.
     * @example
     * // Count the number of ServiceRequests
     * const count = await prisma.serviceRequest.count({
     *   where: {
     *     // ... the filter for the ServiceRequests we want to count
     *   }
     * })
    **/
    count<T extends ServiceRequestCountArgs>(
      args?: Subset<T, ServiceRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceRequestAggregateArgs>(args: Subset<T, ServiceRequestAggregateArgs>): Prisma.PrismaPromise<GetServiceRequestAggregateType<T>>

    /**
     * Group by ServiceRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceRequestGroupByArgs['orderBy'] }
        : { orderBy?: ServiceRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceRequest model
   */
  readonly fields: ServiceRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServiceRequest model
   */
  interface ServiceRequestFieldRefs {
    readonly id: FieldRef<"ServiceRequest", 'String'>
    readonly userId: FieldRef<"ServiceRequest", 'String'>
    readonly serviceId: FieldRef<"ServiceRequest", 'String'>
    readonly details: FieldRef<"ServiceRequest", 'String'>
    readonly status: FieldRef<"ServiceRequest", 'String'>
    readonly createdAt: FieldRef<"ServiceRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"ServiceRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServiceRequest findUnique
   */
  export type ServiceRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRequest to fetch.
     */
    where: ServiceRequestWhereUniqueInput
  }

  /**
   * ServiceRequest findUniqueOrThrow
   */
  export type ServiceRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRequest to fetch.
     */
    where: ServiceRequestWhereUniqueInput
  }

  /**
   * ServiceRequest findFirst
   */
  export type ServiceRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRequest to fetch.
     */
    where?: ServiceRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceRequests to fetch.
     */
    orderBy?: ServiceRequestOrderByWithRelationInput | ServiceRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceRequests.
     */
    cursor?: ServiceRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceRequests.
     */
    distinct?: ServiceRequestScalarFieldEnum | ServiceRequestScalarFieldEnum[]
  }

  /**
   * ServiceRequest findFirstOrThrow
   */
  export type ServiceRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRequest to fetch.
     */
    where?: ServiceRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceRequests to fetch.
     */
    orderBy?: ServiceRequestOrderByWithRelationInput | ServiceRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceRequests.
     */
    cursor?: ServiceRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceRequests.
     */
    distinct?: ServiceRequestScalarFieldEnum | ServiceRequestScalarFieldEnum[]
  }

  /**
   * ServiceRequest findMany
   */
  export type ServiceRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRequests to fetch.
     */
    where?: ServiceRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceRequests to fetch.
     */
    orderBy?: ServiceRequestOrderByWithRelationInput | ServiceRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceRequests.
     */
    cursor?: ServiceRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceRequests.
     */
    skip?: number
    distinct?: ServiceRequestScalarFieldEnum | ServiceRequestScalarFieldEnum[]
  }

  /**
   * ServiceRequest create
   */
  export type ServiceRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceRequest.
     */
    data: XOR<ServiceRequestCreateInput, ServiceRequestUncheckedCreateInput>
  }

  /**
   * ServiceRequest createMany
   */
  export type ServiceRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceRequests.
     */
    data: ServiceRequestCreateManyInput | ServiceRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceRequest createManyAndReturn
   */
  export type ServiceRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceRequests.
     */
    data: ServiceRequestCreateManyInput | ServiceRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceRequest update
   */
  export type ServiceRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceRequest.
     */
    data: XOR<ServiceRequestUpdateInput, ServiceRequestUncheckedUpdateInput>
    /**
     * Choose, which ServiceRequest to update.
     */
    where: ServiceRequestWhereUniqueInput
  }

  /**
   * ServiceRequest updateMany
   */
  export type ServiceRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceRequests.
     */
    data: XOR<ServiceRequestUpdateManyMutationInput, ServiceRequestUncheckedUpdateManyInput>
    /**
     * Filter which ServiceRequests to update
     */
    where?: ServiceRequestWhereInput
    /**
     * Limit how many ServiceRequests to update.
     */
    limit?: number
  }

  /**
   * ServiceRequest updateManyAndReturn
   */
  export type ServiceRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * The data used to update ServiceRequests.
     */
    data: XOR<ServiceRequestUpdateManyMutationInput, ServiceRequestUncheckedUpdateManyInput>
    /**
     * Filter which ServiceRequests to update
     */
    where?: ServiceRequestWhereInput
    /**
     * Limit how many ServiceRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceRequest upsert
   */
  export type ServiceRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceRequest to update in case it exists.
     */
    where: ServiceRequestWhereUniqueInput
    /**
     * In case the ServiceRequest found by the `where` argument doesn't exist, create a new ServiceRequest with this data.
     */
    create: XOR<ServiceRequestCreateInput, ServiceRequestUncheckedCreateInput>
    /**
     * In case the ServiceRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceRequestUpdateInput, ServiceRequestUncheckedUpdateInput>
  }

  /**
   * ServiceRequest delete
   */
  export type ServiceRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * Filter which ServiceRequest to delete.
     */
    where: ServiceRequestWhereUniqueInput
  }

  /**
   * ServiceRequest deleteMany
   */
  export type ServiceRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceRequests to delete
     */
    where?: ServiceRequestWhereInput
    /**
     * Limit how many ServiceRequests to delete.
     */
    limit?: number
  }

  /**
   * ServiceRequest without action
   */
  export type ServiceRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
  }


  /**
   * Model TrainingCourse
   */

  export type AggregateTrainingCourse = {
    _count: TrainingCourseCountAggregateOutputType | null
    _avg: TrainingCourseAvgAggregateOutputType | null
    _sum: TrainingCourseSumAggregateOutputType | null
    _min: TrainingCourseMinAggregateOutputType | null
    _max: TrainingCourseMaxAggregateOutputType | null
  }

  export type TrainingCourseAvgAggregateOutputType = {
    price: number | null
  }

  export type TrainingCourseSumAggregateOutputType = {
    price: number | null
  }

  export type TrainingCourseMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    duration: string | null
    price: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrainingCourseMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    duration: string | null
    price: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrainingCourseCountAggregateOutputType = {
    id: number
    name: number
    description: number
    duration: number
    price: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TrainingCourseAvgAggregateInputType = {
    price?: true
  }

  export type TrainingCourseSumAggregateInputType = {
    price?: true
  }

  export type TrainingCourseMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    duration?: true
    price?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrainingCourseMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    duration?: true
    price?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrainingCourseCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    duration?: true
    price?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TrainingCourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingCourse to aggregate.
     */
    where?: TrainingCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingCourses to fetch.
     */
    orderBy?: TrainingCourseOrderByWithRelationInput | TrainingCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainingCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainingCourses
    **/
    _count?: true | TrainingCourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrainingCourseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrainingCourseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainingCourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainingCourseMaxAggregateInputType
  }

  export type GetTrainingCourseAggregateType<T extends TrainingCourseAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainingCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainingCourse[P]>
      : GetScalarType<T[P], AggregateTrainingCourse[P]>
  }




  export type TrainingCourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingCourseWhereInput
    orderBy?: TrainingCourseOrderByWithAggregationInput | TrainingCourseOrderByWithAggregationInput[]
    by: TrainingCourseScalarFieldEnum[] | TrainingCourseScalarFieldEnum
    having?: TrainingCourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainingCourseCountAggregateInputType | true
    _avg?: TrainingCourseAvgAggregateInputType
    _sum?: TrainingCourseSumAggregateInputType
    _min?: TrainingCourseMinAggregateInputType
    _max?: TrainingCourseMaxAggregateInputType
  }

  export type TrainingCourseGroupByOutputType = {
    id: string
    name: string
    description: string
    duration: string
    price: number
    createdAt: Date
    updatedAt: Date
    _count: TrainingCourseCountAggregateOutputType | null
    _avg: TrainingCourseAvgAggregateOutputType | null
    _sum: TrainingCourseSumAggregateOutputType | null
    _min: TrainingCourseMinAggregateOutputType | null
    _max: TrainingCourseMaxAggregateOutputType | null
  }

  type GetTrainingCourseGroupByPayload<T extends TrainingCourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainingCourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainingCourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainingCourseGroupByOutputType[P]>
            : GetScalarType<T[P], TrainingCourseGroupByOutputType[P]>
        }
      >
    >


  export type TrainingCourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    duration?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["trainingCourse"]>

  export type TrainingCourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    duration?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["trainingCourse"]>

  export type TrainingCourseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    duration?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["trainingCourse"]>

  export type TrainingCourseSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    duration?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TrainingCourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "duration" | "price" | "createdAt" | "updatedAt", ExtArgs["result"]["trainingCourse"]>

  export type $TrainingCoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainingCourse"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      duration: string
      price: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["trainingCourse"]>
    composites: {}
  }

  type TrainingCourseGetPayload<S extends boolean | null | undefined | TrainingCourseDefaultArgs> = $Result.GetResult<Prisma.$TrainingCoursePayload, S>

  type TrainingCourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainingCourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainingCourseCountAggregateInputType | true
    }

  export interface TrainingCourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainingCourse'], meta: { name: 'TrainingCourse' } }
    /**
     * Find zero or one TrainingCourse that matches the filter.
     * @param {TrainingCourseFindUniqueArgs} args - Arguments to find a TrainingCourse
     * @example
     * // Get one TrainingCourse
     * const trainingCourse = await prisma.trainingCourse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainingCourseFindUniqueArgs>(args: SelectSubset<T, TrainingCourseFindUniqueArgs<ExtArgs>>): Prisma__TrainingCourseClient<$Result.GetResult<Prisma.$TrainingCoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainingCourse that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainingCourseFindUniqueOrThrowArgs} args - Arguments to find a TrainingCourse
     * @example
     * // Get one TrainingCourse
     * const trainingCourse = await prisma.trainingCourse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainingCourseFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainingCourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainingCourseClient<$Result.GetResult<Prisma.$TrainingCoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingCourse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingCourseFindFirstArgs} args - Arguments to find a TrainingCourse
     * @example
     * // Get one TrainingCourse
     * const trainingCourse = await prisma.trainingCourse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainingCourseFindFirstArgs>(args?: SelectSubset<T, TrainingCourseFindFirstArgs<ExtArgs>>): Prisma__TrainingCourseClient<$Result.GetResult<Prisma.$TrainingCoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingCourse that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingCourseFindFirstOrThrowArgs} args - Arguments to find a TrainingCourse
     * @example
     * // Get one TrainingCourse
     * const trainingCourse = await prisma.trainingCourse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainingCourseFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainingCourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainingCourseClient<$Result.GetResult<Prisma.$TrainingCoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainingCourses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingCourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainingCourses
     * const trainingCourses = await prisma.trainingCourse.findMany()
     * 
     * // Get first 10 TrainingCourses
     * const trainingCourses = await prisma.trainingCourse.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trainingCourseWithIdOnly = await prisma.trainingCourse.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrainingCourseFindManyArgs>(args?: SelectSubset<T, TrainingCourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingCoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainingCourse.
     * @param {TrainingCourseCreateArgs} args - Arguments to create a TrainingCourse.
     * @example
     * // Create one TrainingCourse
     * const TrainingCourse = await prisma.trainingCourse.create({
     *   data: {
     *     // ... data to create a TrainingCourse
     *   }
     * })
     * 
     */
    create<T extends TrainingCourseCreateArgs>(args: SelectSubset<T, TrainingCourseCreateArgs<ExtArgs>>): Prisma__TrainingCourseClient<$Result.GetResult<Prisma.$TrainingCoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainingCourses.
     * @param {TrainingCourseCreateManyArgs} args - Arguments to create many TrainingCourses.
     * @example
     * // Create many TrainingCourses
     * const trainingCourse = await prisma.trainingCourse.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainingCourseCreateManyArgs>(args?: SelectSubset<T, TrainingCourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainingCourses and returns the data saved in the database.
     * @param {TrainingCourseCreateManyAndReturnArgs} args - Arguments to create many TrainingCourses.
     * @example
     * // Create many TrainingCourses
     * const trainingCourse = await prisma.trainingCourse.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainingCourses and only return the `id`
     * const trainingCourseWithIdOnly = await prisma.trainingCourse.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainingCourseCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainingCourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingCoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainingCourse.
     * @param {TrainingCourseDeleteArgs} args - Arguments to delete one TrainingCourse.
     * @example
     * // Delete one TrainingCourse
     * const TrainingCourse = await prisma.trainingCourse.delete({
     *   where: {
     *     // ... filter to delete one TrainingCourse
     *   }
     * })
     * 
     */
    delete<T extends TrainingCourseDeleteArgs>(args: SelectSubset<T, TrainingCourseDeleteArgs<ExtArgs>>): Prisma__TrainingCourseClient<$Result.GetResult<Prisma.$TrainingCoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainingCourse.
     * @param {TrainingCourseUpdateArgs} args - Arguments to update one TrainingCourse.
     * @example
     * // Update one TrainingCourse
     * const trainingCourse = await prisma.trainingCourse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainingCourseUpdateArgs>(args: SelectSubset<T, TrainingCourseUpdateArgs<ExtArgs>>): Prisma__TrainingCourseClient<$Result.GetResult<Prisma.$TrainingCoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainingCourses.
     * @param {TrainingCourseDeleteManyArgs} args - Arguments to filter TrainingCourses to delete.
     * @example
     * // Delete a few TrainingCourses
     * const { count } = await prisma.trainingCourse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainingCourseDeleteManyArgs>(args?: SelectSubset<T, TrainingCourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingCourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainingCourses
     * const trainingCourse = await prisma.trainingCourse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainingCourseUpdateManyArgs>(args: SelectSubset<T, TrainingCourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingCourses and returns the data updated in the database.
     * @param {TrainingCourseUpdateManyAndReturnArgs} args - Arguments to update many TrainingCourses.
     * @example
     * // Update many TrainingCourses
     * const trainingCourse = await prisma.trainingCourse.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainingCourses and only return the `id`
     * const trainingCourseWithIdOnly = await prisma.trainingCourse.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainingCourseUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainingCourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingCoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainingCourse.
     * @param {TrainingCourseUpsertArgs} args - Arguments to update or create a TrainingCourse.
     * @example
     * // Update or create a TrainingCourse
     * const trainingCourse = await prisma.trainingCourse.upsert({
     *   create: {
     *     // ... data to create a TrainingCourse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainingCourse we want to update
     *   }
     * })
     */
    upsert<T extends TrainingCourseUpsertArgs>(args: SelectSubset<T, TrainingCourseUpsertArgs<ExtArgs>>): Prisma__TrainingCourseClient<$Result.GetResult<Prisma.$TrainingCoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainingCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingCourseCountArgs} args - Arguments to filter TrainingCourses to count.
     * @example
     * // Count the number of TrainingCourses
     * const count = await prisma.trainingCourse.count({
     *   where: {
     *     // ... the filter for the TrainingCourses we want to count
     *   }
     * })
    **/
    count<T extends TrainingCourseCountArgs>(
      args?: Subset<T, TrainingCourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainingCourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainingCourse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingCourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainingCourseAggregateArgs>(args: Subset<T, TrainingCourseAggregateArgs>): Prisma.PrismaPromise<GetTrainingCourseAggregateType<T>>

    /**
     * Group by TrainingCourse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingCourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainingCourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainingCourseGroupByArgs['orderBy'] }
        : { orderBy?: TrainingCourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainingCourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainingCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainingCourse model
   */
  readonly fields: TrainingCourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainingCourse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainingCourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrainingCourse model
   */
  interface TrainingCourseFieldRefs {
    readonly id: FieldRef<"TrainingCourse", 'String'>
    readonly name: FieldRef<"TrainingCourse", 'String'>
    readonly description: FieldRef<"TrainingCourse", 'String'>
    readonly duration: FieldRef<"TrainingCourse", 'String'>
    readonly price: FieldRef<"TrainingCourse", 'Float'>
    readonly createdAt: FieldRef<"TrainingCourse", 'DateTime'>
    readonly updatedAt: FieldRef<"TrainingCourse", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrainingCourse findUnique
   */
  export type TrainingCourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingCourse
     */
    select?: TrainingCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingCourse
     */
    omit?: TrainingCourseOmit<ExtArgs> | null
    /**
     * Filter, which TrainingCourse to fetch.
     */
    where: TrainingCourseWhereUniqueInput
  }

  /**
   * TrainingCourse findUniqueOrThrow
   */
  export type TrainingCourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingCourse
     */
    select?: TrainingCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingCourse
     */
    omit?: TrainingCourseOmit<ExtArgs> | null
    /**
     * Filter, which TrainingCourse to fetch.
     */
    where: TrainingCourseWhereUniqueInput
  }

  /**
   * TrainingCourse findFirst
   */
  export type TrainingCourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingCourse
     */
    select?: TrainingCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingCourse
     */
    omit?: TrainingCourseOmit<ExtArgs> | null
    /**
     * Filter, which TrainingCourse to fetch.
     */
    where?: TrainingCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingCourses to fetch.
     */
    orderBy?: TrainingCourseOrderByWithRelationInput | TrainingCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingCourses.
     */
    cursor?: TrainingCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingCourses.
     */
    distinct?: TrainingCourseScalarFieldEnum | TrainingCourseScalarFieldEnum[]
  }

  /**
   * TrainingCourse findFirstOrThrow
   */
  export type TrainingCourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingCourse
     */
    select?: TrainingCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingCourse
     */
    omit?: TrainingCourseOmit<ExtArgs> | null
    /**
     * Filter, which TrainingCourse to fetch.
     */
    where?: TrainingCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingCourses to fetch.
     */
    orderBy?: TrainingCourseOrderByWithRelationInput | TrainingCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingCourses.
     */
    cursor?: TrainingCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingCourses.
     */
    distinct?: TrainingCourseScalarFieldEnum | TrainingCourseScalarFieldEnum[]
  }

  /**
   * TrainingCourse findMany
   */
  export type TrainingCourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingCourse
     */
    select?: TrainingCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingCourse
     */
    omit?: TrainingCourseOmit<ExtArgs> | null
    /**
     * Filter, which TrainingCourses to fetch.
     */
    where?: TrainingCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingCourses to fetch.
     */
    orderBy?: TrainingCourseOrderByWithRelationInput | TrainingCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainingCourses.
     */
    cursor?: TrainingCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingCourses.
     */
    skip?: number
    distinct?: TrainingCourseScalarFieldEnum | TrainingCourseScalarFieldEnum[]
  }

  /**
   * TrainingCourse create
   */
  export type TrainingCourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingCourse
     */
    select?: TrainingCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingCourse
     */
    omit?: TrainingCourseOmit<ExtArgs> | null
    /**
     * The data needed to create a TrainingCourse.
     */
    data: XOR<TrainingCourseCreateInput, TrainingCourseUncheckedCreateInput>
  }

  /**
   * TrainingCourse createMany
   */
  export type TrainingCourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainingCourses.
     */
    data: TrainingCourseCreateManyInput | TrainingCourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainingCourse createManyAndReturn
   */
  export type TrainingCourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingCourse
     */
    select?: TrainingCourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingCourse
     */
    omit?: TrainingCourseOmit<ExtArgs> | null
    /**
     * The data used to create many TrainingCourses.
     */
    data: TrainingCourseCreateManyInput | TrainingCourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainingCourse update
   */
  export type TrainingCourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingCourse
     */
    select?: TrainingCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingCourse
     */
    omit?: TrainingCourseOmit<ExtArgs> | null
    /**
     * The data needed to update a TrainingCourse.
     */
    data: XOR<TrainingCourseUpdateInput, TrainingCourseUncheckedUpdateInput>
    /**
     * Choose, which TrainingCourse to update.
     */
    where: TrainingCourseWhereUniqueInput
  }

  /**
   * TrainingCourse updateMany
   */
  export type TrainingCourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainingCourses.
     */
    data: XOR<TrainingCourseUpdateManyMutationInput, TrainingCourseUncheckedUpdateManyInput>
    /**
     * Filter which TrainingCourses to update
     */
    where?: TrainingCourseWhereInput
    /**
     * Limit how many TrainingCourses to update.
     */
    limit?: number
  }

  /**
   * TrainingCourse updateManyAndReturn
   */
  export type TrainingCourseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingCourse
     */
    select?: TrainingCourseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingCourse
     */
    omit?: TrainingCourseOmit<ExtArgs> | null
    /**
     * The data used to update TrainingCourses.
     */
    data: XOR<TrainingCourseUpdateManyMutationInput, TrainingCourseUncheckedUpdateManyInput>
    /**
     * Filter which TrainingCourses to update
     */
    where?: TrainingCourseWhereInput
    /**
     * Limit how many TrainingCourses to update.
     */
    limit?: number
  }

  /**
   * TrainingCourse upsert
   */
  export type TrainingCourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingCourse
     */
    select?: TrainingCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingCourse
     */
    omit?: TrainingCourseOmit<ExtArgs> | null
    /**
     * The filter to search for the TrainingCourse to update in case it exists.
     */
    where: TrainingCourseWhereUniqueInput
    /**
     * In case the TrainingCourse found by the `where` argument doesn't exist, create a new TrainingCourse with this data.
     */
    create: XOR<TrainingCourseCreateInput, TrainingCourseUncheckedCreateInput>
    /**
     * In case the TrainingCourse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainingCourseUpdateInput, TrainingCourseUncheckedUpdateInput>
  }

  /**
   * TrainingCourse delete
   */
  export type TrainingCourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingCourse
     */
    select?: TrainingCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingCourse
     */
    omit?: TrainingCourseOmit<ExtArgs> | null
    /**
     * Filter which TrainingCourse to delete.
     */
    where: TrainingCourseWhereUniqueInput
  }

  /**
   * TrainingCourse deleteMany
   */
  export type TrainingCourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingCourses to delete
     */
    where?: TrainingCourseWhereInput
    /**
     * Limit how many TrainingCourses to delete.
     */
    limit?: number
  }

  /**
   * TrainingCourse without action
   */
  export type TrainingCourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingCourse
     */
    select?: TrainingCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingCourse
     */
    omit?: TrainingCourseOmit<ExtArgs> | null
  }


  /**
   * Model BusinessRegistration
   */

  export type AggregateBusinessRegistration = {
    _count: BusinessRegistrationCountAggregateOutputType | null
    _min: BusinessRegistrationMinAggregateOutputType | null
    _max: BusinessRegistrationMaxAggregateOutputType | null
  }

  export type BusinessRegistrationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    businessName: string | null
    businessType: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BusinessRegistrationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    businessName: string | null
    businessType: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BusinessRegistrationCountAggregateOutputType = {
    id: number
    userId: number
    businessName: number
    businessType: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BusinessRegistrationMinAggregateInputType = {
    id?: true
    userId?: true
    businessName?: true
    businessType?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BusinessRegistrationMaxAggregateInputType = {
    id?: true
    userId?: true
    businessName?: true
    businessType?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BusinessRegistrationCountAggregateInputType = {
    id?: true
    userId?: true
    businessName?: true
    businessType?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BusinessRegistrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessRegistration to aggregate.
     */
    where?: BusinessRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessRegistrations to fetch.
     */
    orderBy?: BusinessRegistrationOrderByWithRelationInput | BusinessRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusinessRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BusinessRegistrations
    **/
    _count?: true | BusinessRegistrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessRegistrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessRegistrationMaxAggregateInputType
  }

  export type GetBusinessRegistrationAggregateType<T extends BusinessRegistrationAggregateArgs> = {
        [P in keyof T & keyof AggregateBusinessRegistration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusinessRegistration[P]>
      : GetScalarType<T[P], AggregateBusinessRegistration[P]>
  }




  export type BusinessRegistrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessRegistrationWhereInput
    orderBy?: BusinessRegistrationOrderByWithAggregationInput | BusinessRegistrationOrderByWithAggregationInput[]
    by: BusinessRegistrationScalarFieldEnum[] | BusinessRegistrationScalarFieldEnum
    having?: BusinessRegistrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessRegistrationCountAggregateInputType | true
    _min?: BusinessRegistrationMinAggregateInputType
    _max?: BusinessRegistrationMaxAggregateInputType
  }

  export type BusinessRegistrationGroupByOutputType = {
    id: string
    userId: string
    businessName: string
    businessType: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: BusinessRegistrationCountAggregateOutputType | null
    _min: BusinessRegistrationMinAggregateOutputType | null
    _max: BusinessRegistrationMaxAggregateOutputType | null
  }

  type GetBusinessRegistrationGroupByPayload<T extends BusinessRegistrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusinessRegistrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusinessRegistrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessRegistrationGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessRegistrationGroupByOutputType[P]>
        }
      >
    >


  export type BusinessRegistrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessName?: boolean
    businessType?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businessRegistration"]>

  export type BusinessRegistrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessName?: boolean
    businessType?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businessRegistration"]>

  export type BusinessRegistrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessName?: boolean
    businessType?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businessRegistration"]>

  export type BusinessRegistrationSelectScalar = {
    id?: boolean
    userId?: boolean
    businessName?: boolean
    businessType?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BusinessRegistrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "businessName" | "businessType" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["businessRegistration"]>
  export type BusinessRegistrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BusinessRegistrationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BusinessRegistrationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BusinessRegistrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BusinessRegistration"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      businessName: string
      businessType: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["businessRegistration"]>
    composites: {}
  }

  type BusinessRegistrationGetPayload<S extends boolean | null | undefined | BusinessRegistrationDefaultArgs> = $Result.GetResult<Prisma.$BusinessRegistrationPayload, S>

  type BusinessRegistrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BusinessRegistrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BusinessRegistrationCountAggregateInputType | true
    }

  export interface BusinessRegistrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BusinessRegistration'], meta: { name: 'BusinessRegistration' } }
    /**
     * Find zero or one BusinessRegistration that matches the filter.
     * @param {BusinessRegistrationFindUniqueArgs} args - Arguments to find a BusinessRegistration
     * @example
     * // Get one BusinessRegistration
     * const businessRegistration = await prisma.businessRegistration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusinessRegistrationFindUniqueArgs>(args: SelectSubset<T, BusinessRegistrationFindUniqueArgs<ExtArgs>>): Prisma__BusinessRegistrationClient<$Result.GetResult<Prisma.$BusinessRegistrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BusinessRegistration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BusinessRegistrationFindUniqueOrThrowArgs} args - Arguments to find a BusinessRegistration
     * @example
     * // Get one BusinessRegistration
     * const businessRegistration = await prisma.businessRegistration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusinessRegistrationFindUniqueOrThrowArgs>(args: SelectSubset<T, BusinessRegistrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusinessRegistrationClient<$Result.GetResult<Prisma.$BusinessRegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BusinessRegistration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessRegistrationFindFirstArgs} args - Arguments to find a BusinessRegistration
     * @example
     * // Get one BusinessRegistration
     * const businessRegistration = await prisma.businessRegistration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusinessRegistrationFindFirstArgs>(args?: SelectSubset<T, BusinessRegistrationFindFirstArgs<ExtArgs>>): Prisma__BusinessRegistrationClient<$Result.GetResult<Prisma.$BusinessRegistrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BusinessRegistration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessRegistrationFindFirstOrThrowArgs} args - Arguments to find a BusinessRegistration
     * @example
     * // Get one BusinessRegistration
     * const businessRegistration = await prisma.businessRegistration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusinessRegistrationFindFirstOrThrowArgs>(args?: SelectSubset<T, BusinessRegistrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusinessRegistrationClient<$Result.GetResult<Prisma.$BusinessRegistrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BusinessRegistrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessRegistrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BusinessRegistrations
     * const businessRegistrations = await prisma.businessRegistration.findMany()
     * 
     * // Get first 10 BusinessRegistrations
     * const businessRegistrations = await prisma.businessRegistration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const businessRegistrationWithIdOnly = await prisma.businessRegistration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BusinessRegistrationFindManyArgs>(args?: SelectSubset<T, BusinessRegistrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BusinessRegistration.
     * @param {BusinessRegistrationCreateArgs} args - Arguments to create a BusinessRegistration.
     * @example
     * // Create one BusinessRegistration
     * const BusinessRegistration = await prisma.businessRegistration.create({
     *   data: {
     *     // ... data to create a BusinessRegistration
     *   }
     * })
     * 
     */
    create<T extends BusinessRegistrationCreateArgs>(args: SelectSubset<T, BusinessRegistrationCreateArgs<ExtArgs>>): Prisma__BusinessRegistrationClient<$Result.GetResult<Prisma.$BusinessRegistrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BusinessRegistrations.
     * @param {BusinessRegistrationCreateManyArgs} args - Arguments to create many BusinessRegistrations.
     * @example
     * // Create many BusinessRegistrations
     * const businessRegistration = await prisma.businessRegistration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusinessRegistrationCreateManyArgs>(args?: SelectSubset<T, BusinessRegistrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BusinessRegistrations and returns the data saved in the database.
     * @param {BusinessRegistrationCreateManyAndReturnArgs} args - Arguments to create many BusinessRegistrations.
     * @example
     * // Create many BusinessRegistrations
     * const businessRegistration = await prisma.businessRegistration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BusinessRegistrations and only return the `id`
     * const businessRegistrationWithIdOnly = await prisma.businessRegistration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BusinessRegistrationCreateManyAndReturnArgs>(args?: SelectSubset<T, BusinessRegistrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessRegistrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BusinessRegistration.
     * @param {BusinessRegistrationDeleteArgs} args - Arguments to delete one BusinessRegistration.
     * @example
     * // Delete one BusinessRegistration
     * const BusinessRegistration = await prisma.businessRegistration.delete({
     *   where: {
     *     // ... filter to delete one BusinessRegistration
     *   }
     * })
     * 
     */
    delete<T extends BusinessRegistrationDeleteArgs>(args: SelectSubset<T, BusinessRegistrationDeleteArgs<ExtArgs>>): Prisma__BusinessRegistrationClient<$Result.GetResult<Prisma.$BusinessRegistrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BusinessRegistration.
     * @param {BusinessRegistrationUpdateArgs} args - Arguments to update one BusinessRegistration.
     * @example
     * // Update one BusinessRegistration
     * const businessRegistration = await prisma.businessRegistration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusinessRegistrationUpdateArgs>(args: SelectSubset<T, BusinessRegistrationUpdateArgs<ExtArgs>>): Prisma__BusinessRegistrationClient<$Result.GetResult<Prisma.$BusinessRegistrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BusinessRegistrations.
     * @param {BusinessRegistrationDeleteManyArgs} args - Arguments to filter BusinessRegistrations to delete.
     * @example
     * // Delete a few BusinessRegistrations
     * const { count } = await prisma.businessRegistration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusinessRegistrationDeleteManyArgs>(args?: SelectSubset<T, BusinessRegistrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessRegistrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BusinessRegistrations
     * const businessRegistration = await prisma.businessRegistration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusinessRegistrationUpdateManyArgs>(args: SelectSubset<T, BusinessRegistrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessRegistrations and returns the data updated in the database.
     * @param {BusinessRegistrationUpdateManyAndReturnArgs} args - Arguments to update many BusinessRegistrations.
     * @example
     * // Update many BusinessRegistrations
     * const businessRegistration = await prisma.businessRegistration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BusinessRegistrations and only return the `id`
     * const businessRegistrationWithIdOnly = await prisma.businessRegistration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BusinessRegistrationUpdateManyAndReturnArgs>(args: SelectSubset<T, BusinessRegistrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessRegistrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BusinessRegistration.
     * @param {BusinessRegistrationUpsertArgs} args - Arguments to update or create a BusinessRegistration.
     * @example
     * // Update or create a BusinessRegistration
     * const businessRegistration = await prisma.businessRegistration.upsert({
     *   create: {
     *     // ... data to create a BusinessRegistration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BusinessRegistration we want to update
     *   }
     * })
     */
    upsert<T extends BusinessRegistrationUpsertArgs>(args: SelectSubset<T, BusinessRegistrationUpsertArgs<ExtArgs>>): Prisma__BusinessRegistrationClient<$Result.GetResult<Prisma.$BusinessRegistrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BusinessRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessRegistrationCountArgs} args - Arguments to filter BusinessRegistrations to count.
     * @example
     * // Count the number of BusinessRegistrations
     * const count = await prisma.businessRegistration.count({
     *   where: {
     *     // ... the filter for the BusinessRegistrations we want to count
     *   }
     * })
    **/
    count<T extends BusinessRegistrationCountArgs>(
      args?: Subset<T, BusinessRegistrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusinessRegistrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BusinessRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessRegistrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BusinessRegistrationAggregateArgs>(args: Subset<T, BusinessRegistrationAggregateArgs>): Prisma.PrismaPromise<GetBusinessRegistrationAggregateType<T>>

    /**
     * Group by BusinessRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessRegistrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BusinessRegistrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusinessRegistrationGroupByArgs['orderBy'] }
        : { orderBy?: BusinessRegistrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BusinessRegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessRegistrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BusinessRegistration model
   */
  readonly fields: BusinessRegistrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BusinessRegistration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusinessRegistrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BusinessRegistration model
   */
  interface BusinessRegistrationFieldRefs {
    readonly id: FieldRef<"BusinessRegistration", 'String'>
    readonly userId: FieldRef<"BusinessRegistration", 'String'>
    readonly businessName: FieldRef<"BusinessRegistration", 'String'>
    readonly businessType: FieldRef<"BusinessRegistration", 'String'>
    readonly status: FieldRef<"BusinessRegistration", 'String'>
    readonly createdAt: FieldRef<"BusinessRegistration", 'DateTime'>
    readonly updatedAt: FieldRef<"BusinessRegistration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BusinessRegistration findUnique
   */
  export type BusinessRegistrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessRegistration
     */
    select?: BusinessRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessRegistration
     */
    omit?: BusinessRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which BusinessRegistration to fetch.
     */
    where: BusinessRegistrationWhereUniqueInput
  }

  /**
   * BusinessRegistration findUniqueOrThrow
   */
  export type BusinessRegistrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessRegistration
     */
    select?: BusinessRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessRegistration
     */
    omit?: BusinessRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which BusinessRegistration to fetch.
     */
    where: BusinessRegistrationWhereUniqueInput
  }

  /**
   * BusinessRegistration findFirst
   */
  export type BusinessRegistrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessRegistration
     */
    select?: BusinessRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessRegistration
     */
    omit?: BusinessRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which BusinessRegistration to fetch.
     */
    where?: BusinessRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessRegistrations to fetch.
     */
    orderBy?: BusinessRegistrationOrderByWithRelationInput | BusinessRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessRegistrations.
     */
    cursor?: BusinessRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessRegistrations.
     */
    distinct?: BusinessRegistrationScalarFieldEnum | BusinessRegistrationScalarFieldEnum[]
  }

  /**
   * BusinessRegistration findFirstOrThrow
   */
  export type BusinessRegistrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessRegistration
     */
    select?: BusinessRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessRegistration
     */
    omit?: BusinessRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which BusinessRegistration to fetch.
     */
    where?: BusinessRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessRegistrations to fetch.
     */
    orderBy?: BusinessRegistrationOrderByWithRelationInput | BusinessRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessRegistrations.
     */
    cursor?: BusinessRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessRegistrations.
     */
    distinct?: BusinessRegistrationScalarFieldEnum | BusinessRegistrationScalarFieldEnum[]
  }

  /**
   * BusinessRegistration findMany
   */
  export type BusinessRegistrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessRegistration
     */
    select?: BusinessRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessRegistration
     */
    omit?: BusinessRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which BusinessRegistrations to fetch.
     */
    where?: BusinessRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessRegistrations to fetch.
     */
    orderBy?: BusinessRegistrationOrderByWithRelationInput | BusinessRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BusinessRegistrations.
     */
    cursor?: BusinessRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessRegistrations.
     */
    skip?: number
    distinct?: BusinessRegistrationScalarFieldEnum | BusinessRegistrationScalarFieldEnum[]
  }

  /**
   * BusinessRegistration create
   */
  export type BusinessRegistrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessRegistration
     */
    select?: BusinessRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessRegistration
     */
    omit?: BusinessRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessRegistrationInclude<ExtArgs> | null
    /**
     * The data needed to create a BusinessRegistration.
     */
    data: XOR<BusinessRegistrationCreateInput, BusinessRegistrationUncheckedCreateInput>
  }

  /**
   * BusinessRegistration createMany
   */
  export type BusinessRegistrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BusinessRegistrations.
     */
    data: BusinessRegistrationCreateManyInput | BusinessRegistrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BusinessRegistration createManyAndReturn
   */
  export type BusinessRegistrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessRegistration
     */
    select?: BusinessRegistrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessRegistration
     */
    omit?: BusinessRegistrationOmit<ExtArgs> | null
    /**
     * The data used to create many BusinessRegistrations.
     */
    data: BusinessRegistrationCreateManyInput | BusinessRegistrationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessRegistrationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BusinessRegistration update
   */
  export type BusinessRegistrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessRegistration
     */
    select?: BusinessRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessRegistration
     */
    omit?: BusinessRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessRegistrationInclude<ExtArgs> | null
    /**
     * The data needed to update a BusinessRegistration.
     */
    data: XOR<BusinessRegistrationUpdateInput, BusinessRegistrationUncheckedUpdateInput>
    /**
     * Choose, which BusinessRegistration to update.
     */
    where: BusinessRegistrationWhereUniqueInput
  }

  /**
   * BusinessRegistration updateMany
   */
  export type BusinessRegistrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BusinessRegistrations.
     */
    data: XOR<BusinessRegistrationUpdateManyMutationInput, BusinessRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which BusinessRegistrations to update
     */
    where?: BusinessRegistrationWhereInput
    /**
     * Limit how many BusinessRegistrations to update.
     */
    limit?: number
  }

  /**
   * BusinessRegistration updateManyAndReturn
   */
  export type BusinessRegistrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessRegistration
     */
    select?: BusinessRegistrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessRegistration
     */
    omit?: BusinessRegistrationOmit<ExtArgs> | null
    /**
     * The data used to update BusinessRegistrations.
     */
    data: XOR<BusinessRegistrationUpdateManyMutationInput, BusinessRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which BusinessRegistrations to update
     */
    where?: BusinessRegistrationWhereInput
    /**
     * Limit how many BusinessRegistrations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessRegistrationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BusinessRegistration upsert
   */
  export type BusinessRegistrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessRegistration
     */
    select?: BusinessRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessRegistration
     */
    omit?: BusinessRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessRegistrationInclude<ExtArgs> | null
    /**
     * The filter to search for the BusinessRegistration to update in case it exists.
     */
    where: BusinessRegistrationWhereUniqueInput
    /**
     * In case the BusinessRegistration found by the `where` argument doesn't exist, create a new BusinessRegistration with this data.
     */
    create: XOR<BusinessRegistrationCreateInput, BusinessRegistrationUncheckedCreateInput>
    /**
     * In case the BusinessRegistration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusinessRegistrationUpdateInput, BusinessRegistrationUncheckedUpdateInput>
  }

  /**
   * BusinessRegistration delete
   */
  export type BusinessRegistrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessRegistration
     */
    select?: BusinessRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessRegistration
     */
    omit?: BusinessRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessRegistrationInclude<ExtArgs> | null
    /**
     * Filter which BusinessRegistration to delete.
     */
    where: BusinessRegistrationWhereUniqueInput
  }

  /**
   * BusinessRegistration deleteMany
   */
  export type BusinessRegistrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessRegistrations to delete
     */
    where?: BusinessRegistrationWhereInput
    /**
     * Limit how many BusinessRegistrations to delete.
     */
    limit?: number
  }

  /**
   * BusinessRegistration without action
   */
  export type BusinessRegistrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessRegistration
     */
    select?: BusinessRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessRegistration
     */
    omit?: BusinessRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessRegistrationInclude<ExtArgs> | null
  }


  /**
   * Model CafeMenuItem
   */

  export type AggregateCafeMenuItem = {
    _count: CafeMenuItemCountAggregateOutputType | null
    _avg: CafeMenuItemAvgAggregateOutputType | null
    _sum: CafeMenuItemSumAggregateOutputType | null
    _min: CafeMenuItemMinAggregateOutputType | null
    _max: CafeMenuItemMaxAggregateOutputType | null
  }

  export type CafeMenuItemAvgAggregateOutputType = {
    price: number | null
  }

  export type CafeMenuItemSumAggregateOutputType = {
    price: number | null
  }

  export type CafeMenuItemMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    price: number | null
    category: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CafeMenuItemMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    price: number | null
    category: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CafeMenuItemCountAggregateOutputType = {
    id: number
    name: number
    description: number
    price: number
    category: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CafeMenuItemAvgAggregateInputType = {
    price?: true
  }

  export type CafeMenuItemSumAggregateInputType = {
    price?: true
  }

  export type CafeMenuItemMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    category?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CafeMenuItemMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    category?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CafeMenuItemCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    category?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CafeMenuItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CafeMenuItem to aggregate.
     */
    where?: CafeMenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CafeMenuItems to fetch.
     */
    orderBy?: CafeMenuItemOrderByWithRelationInput | CafeMenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CafeMenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CafeMenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CafeMenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CafeMenuItems
    **/
    _count?: true | CafeMenuItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CafeMenuItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CafeMenuItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CafeMenuItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CafeMenuItemMaxAggregateInputType
  }

  export type GetCafeMenuItemAggregateType<T extends CafeMenuItemAggregateArgs> = {
        [P in keyof T & keyof AggregateCafeMenuItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCafeMenuItem[P]>
      : GetScalarType<T[P], AggregateCafeMenuItem[P]>
  }




  export type CafeMenuItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CafeMenuItemWhereInput
    orderBy?: CafeMenuItemOrderByWithAggregationInput | CafeMenuItemOrderByWithAggregationInput[]
    by: CafeMenuItemScalarFieldEnum[] | CafeMenuItemScalarFieldEnum
    having?: CafeMenuItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CafeMenuItemCountAggregateInputType | true
    _avg?: CafeMenuItemAvgAggregateInputType
    _sum?: CafeMenuItemSumAggregateInputType
    _min?: CafeMenuItemMinAggregateInputType
    _max?: CafeMenuItemMaxAggregateInputType
  }

  export type CafeMenuItemGroupByOutputType = {
    id: string
    name: string
    description: string
    price: number
    category: string
    createdAt: Date
    updatedAt: Date
    _count: CafeMenuItemCountAggregateOutputType | null
    _avg: CafeMenuItemAvgAggregateOutputType | null
    _sum: CafeMenuItemSumAggregateOutputType | null
    _min: CafeMenuItemMinAggregateOutputType | null
    _max: CafeMenuItemMaxAggregateOutputType | null
  }

  type GetCafeMenuItemGroupByPayload<T extends CafeMenuItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CafeMenuItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CafeMenuItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CafeMenuItemGroupByOutputType[P]>
            : GetScalarType<T[P], CafeMenuItemGroupByOutputType[P]>
        }
      >
    >


  export type CafeMenuItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cafeMenuItem"]>

  export type CafeMenuItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cafeMenuItem"]>

  export type CafeMenuItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cafeMenuItem"]>

  export type CafeMenuItemSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CafeMenuItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "price" | "category" | "createdAt" | "updatedAt", ExtArgs["result"]["cafeMenuItem"]>

  export type $CafeMenuItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CafeMenuItem"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      price: number
      category: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cafeMenuItem"]>
    composites: {}
  }

  type CafeMenuItemGetPayload<S extends boolean | null | undefined | CafeMenuItemDefaultArgs> = $Result.GetResult<Prisma.$CafeMenuItemPayload, S>

  type CafeMenuItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CafeMenuItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CafeMenuItemCountAggregateInputType | true
    }

  export interface CafeMenuItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CafeMenuItem'], meta: { name: 'CafeMenuItem' } }
    /**
     * Find zero or one CafeMenuItem that matches the filter.
     * @param {CafeMenuItemFindUniqueArgs} args - Arguments to find a CafeMenuItem
     * @example
     * // Get one CafeMenuItem
     * const cafeMenuItem = await prisma.cafeMenuItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CafeMenuItemFindUniqueArgs>(args: SelectSubset<T, CafeMenuItemFindUniqueArgs<ExtArgs>>): Prisma__CafeMenuItemClient<$Result.GetResult<Prisma.$CafeMenuItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CafeMenuItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CafeMenuItemFindUniqueOrThrowArgs} args - Arguments to find a CafeMenuItem
     * @example
     * // Get one CafeMenuItem
     * const cafeMenuItem = await prisma.cafeMenuItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CafeMenuItemFindUniqueOrThrowArgs>(args: SelectSubset<T, CafeMenuItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CafeMenuItemClient<$Result.GetResult<Prisma.$CafeMenuItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CafeMenuItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CafeMenuItemFindFirstArgs} args - Arguments to find a CafeMenuItem
     * @example
     * // Get one CafeMenuItem
     * const cafeMenuItem = await prisma.cafeMenuItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CafeMenuItemFindFirstArgs>(args?: SelectSubset<T, CafeMenuItemFindFirstArgs<ExtArgs>>): Prisma__CafeMenuItemClient<$Result.GetResult<Prisma.$CafeMenuItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CafeMenuItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CafeMenuItemFindFirstOrThrowArgs} args - Arguments to find a CafeMenuItem
     * @example
     * // Get one CafeMenuItem
     * const cafeMenuItem = await prisma.cafeMenuItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CafeMenuItemFindFirstOrThrowArgs>(args?: SelectSubset<T, CafeMenuItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__CafeMenuItemClient<$Result.GetResult<Prisma.$CafeMenuItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CafeMenuItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CafeMenuItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CafeMenuItems
     * const cafeMenuItems = await prisma.cafeMenuItem.findMany()
     * 
     * // Get first 10 CafeMenuItems
     * const cafeMenuItems = await prisma.cafeMenuItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cafeMenuItemWithIdOnly = await prisma.cafeMenuItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CafeMenuItemFindManyArgs>(args?: SelectSubset<T, CafeMenuItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CafeMenuItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CafeMenuItem.
     * @param {CafeMenuItemCreateArgs} args - Arguments to create a CafeMenuItem.
     * @example
     * // Create one CafeMenuItem
     * const CafeMenuItem = await prisma.cafeMenuItem.create({
     *   data: {
     *     // ... data to create a CafeMenuItem
     *   }
     * })
     * 
     */
    create<T extends CafeMenuItemCreateArgs>(args: SelectSubset<T, CafeMenuItemCreateArgs<ExtArgs>>): Prisma__CafeMenuItemClient<$Result.GetResult<Prisma.$CafeMenuItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CafeMenuItems.
     * @param {CafeMenuItemCreateManyArgs} args - Arguments to create many CafeMenuItems.
     * @example
     * // Create many CafeMenuItems
     * const cafeMenuItem = await prisma.cafeMenuItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CafeMenuItemCreateManyArgs>(args?: SelectSubset<T, CafeMenuItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CafeMenuItems and returns the data saved in the database.
     * @param {CafeMenuItemCreateManyAndReturnArgs} args - Arguments to create many CafeMenuItems.
     * @example
     * // Create many CafeMenuItems
     * const cafeMenuItem = await prisma.cafeMenuItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CafeMenuItems and only return the `id`
     * const cafeMenuItemWithIdOnly = await prisma.cafeMenuItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CafeMenuItemCreateManyAndReturnArgs>(args?: SelectSubset<T, CafeMenuItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CafeMenuItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CafeMenuItem.
     * @param {CafeMenuItemDeleteArgs} args - Arguments to delete one CafeMenuItem.
     * @example
     * // Delete one CafeMenuItem
     * const CafeMenuItem = await prisma.cafeMenuItem.delete({
     *   where: {
     *     // ... filter to delete one CafeMenuItem
     *   }
     * })
     * 
     */
    delete<T extends CafeMenuItemDeleteArgs>(args: SelectSubset<T, CafeMenuItemDeleteArgs<ExtArgs>>): Prisma__CafeMenuItemClient<$Result.GetResult<Prisma.$CafeMenuItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CafeMenuItem.
     * @param {CafeMenuItemUpdateArgs} args - Arguments to update one CafeMenuItem.
     * @example
     * // Update one CafeMenuItem
     * const cafeMenuItem = await prisma.cafeMenuItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CafeMenuItemUpdateArgs>(args: SelectSubset<T, CafeMenuItemUpdateArgs<ExtArgs>>): Prisma__CafeMenuItemClient<$Result.GetResult<Prisma.$CafeMenuItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CafeMenuItems.
     * @param {CafeMenuItemDeleteManyArgs} args - Arguments to filter CafeMenuItems to delete.
     * @example
     * // Delete a few CafeMenuItems
     * const { count } = await prisma.cafeMenuItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CafeMenuItemDeleteManyArgs>(args?: SelectSubset<T, CafeMenuItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CafeMenuItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CafeMenuItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CafeMenuItems
     * const cafeMenuItem = await prisma.cafeMenuItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CafeMenuItemUpdateManyArgs>(args: SelectSubset<T, CafeMenuItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CafeMenuItems and returns the data updated in the database.
     * @param {CafeMenuItemUpdateManyAndReturnArgs} args - Arguments to update many CafeMenuItems.
     * @example
     * // Update many CafeMenuItems
     * const cafeMenuItem = await prisma.cafeMenuItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CafeMenuItems and only return the `id`
     * const cafeMenuItemWithIdOnly = await prisma.cafeMenuItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CafeMenuItemUpdateManyAndReturnArgs>(args: SelectSubset<T, CafeMenuItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CafeMenuItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CafeMenuItem.
     * @param {CafeMenuItemUpsertArgs} args - Arguments to update or create a CafeMenuItem.
     * @example
     * // Update or create a CafeMenuItem
     * const cafeMenuItem = await prisma.cafeMenuItem.upsert({
     *   create: {
     *     // ... data to create a CafeMenuItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CafeMenuItem we want to update
     *   }
     * })
     */
    upsert<T extends CafeMenuItemUpsertArgs>(args: SelectSubset<T, CafeMenuItemUpsertArgs<ExtArgs>>): Prisma__CafeMenuItemClient<$Result.GetResult<Prisma.$CafeMenuItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CafeMenuItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CafeMenuItemCountArgs} args - Arguments to filter CafeMenuItems to count.
     * @example
     * // Count the number of CafeMenuItems
     * const count = await prisma.cafeMenuItem.count({
     *   where: {
     *     // ... the filter for the CafeMenuItems we want to count
     *   }
     * })
    **/
    count<T extends CafeMenuItemCountArgs>(
      args?: Subset<T, CafeMenuItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CafeMenuItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CafeMenuItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CafeMenuItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CafeMenuItemAggregateArgs>(args: Subset<T, CafeMenuItemAggregateArgs>): Prisma.PrismaPromise<GetCafeMenuItemAggregateType<T>>

    /**
     * Group by CafeMenuItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CafeMenuItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CafeMenuItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CafeMenuItemGroupByArgs['orderBy'] }
        : { orderBy?: CafeMenuItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CafeMenuItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCafeMenuItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CafeMenuItem model
   */
  readonly fields: CafeMenuItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CafeMenuItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CafeMenuItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CafeMenuItem model
   */
  interface CafeMenuItemFieldRefs {
    readonly id: FieldRef<"CafeMenuItem", 'String'>
    readonly name: FieldRef<"CafeMenuItem", 'String'>
    readonly description: FieldRef<"CafeMenuItem", 'String'>
    readonly price: FieldRef<"CafeMenuItem", 'Float'>
    readonly category: FieldRef<"CafeMenuItem", 'String'>
    readonly createdAt: FieldRef<"CafeMenuItem", 'DateTime'>
    readonly updatedAt: FieldRef<"CafeMenuItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CafeMenuItem findUnique
   */
  export type CafeMenuItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CafeMenuItem
     */
    select?: CafeMenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CafeMenuItem
     */
    omit?: CafeMenuItemOmit<ExtArgs> | null
    /**
     * Filter, which CafeMenuItem to fetch.
     */
    where: CafeMenuItemWhereUniqueInput
  }

  /**
   * CafeMenuItem findUniqueOrThrow
   */
  export type CafeMenuItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CafeMenuItem
     */
    select?: CafeMenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CafeMenuItem
     */
    omit?: CafeMenuItemOmit<ExtArgs> | null
    /**
     * Filter, which CafeMenuItem to fetch.
     */
    where: CafeMenuItemWhereUniqueInput
  }

  /**
   * CafeMenuItem findFirst
   */
  export type CafeMenuItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CafeMenuItem
     */
    select?: CafeMenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CafeMenuItem
     */
    omit?: CafeMenuItemOmit<ExtArgs> | null
    /**
     * Filter, which CafeMenuItem to fetch.
     */
    where?: CafeMenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CafeMenuItems to fetch.
     */
    orderBy?: CafeMenuItemOrderByWithRelationInput | CafeMenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CafeMenuItems.
     */
    cursor?: CafeMenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CafeMenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CafeMenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CafeMenuItems.
     */
    distinct?: CafeMenuItemScalarFieldEnum | CafeMenuItemScalarFieldEnum[]
  }

  /**
   * CafeMenuItem findFirstOrThrow
   */
  export type CafeMenuItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CafeMenuItem
     */
    select?: CafeMenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CafeMenuItem
     */
    omit?: CafeMenuItemOmit<ExtArgs> | null
    /**
     * Filter, which CafeMenuItem to fetch.
     */
    where?: CafeMenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CafeMenuItems to fetch.
     */
    orderBy?: CafeMenuItemOrderByWithRelationInput | CafeMenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CafeMenuItems.
     */
    cursor?: CafeMenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CafeMenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CafeMenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CafeMenuItems.
     */
    distinct?: CafeMenuItemScalarFieldEnum | CafeMenuItemScalarFieldEnum[]
  }

  /**
   * CafeMenuItem findMany
   */
  export type CafeMenuItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CafeMenuItem
     */
    select?: CafeMenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CafeMenuItem
     */
    omit?: CafeMenuItemOmit<ExtArgs> | null
    /**
     * Filter, which CafeMenuItems to fetch.
     */
    where?: CafeMenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CafeMenuItems to fetch.
     */
    orderBy?: CafeMenuItemOrderByWithRelationInput | CafeMenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CafeMenuItems.
     */
    cursor?: CafeMenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CafeMenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CafeMenuItems.
     */
    skip?: number
    distinct?: CafeMenuItemScalarFieldEnum | CafeMenuItemScalarFieldEnum[]
  }

  /**
   * CafeMenuItem create
   */
  export type CafeMenuItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CafeMenuItem
     */
    select?: CafeMenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CafeMenuItem
     */
    omit?: CafeMenuItemOmit<ExtArgs> | null
    /**
     * The data needed to create a CafeMenuItem.
     */
    data: XOR<CafeMenuItemCreateInput, CafeMenuItemUncheckedCreateInput>
  }

  /**
   * CafeMenuItem createMany
   */
  export type CafeMenuItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CafeMenuItems.
     */
    data: CafeMenuItemCreateManyInput | CafeMenuItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CafeMenuItem createManyAndReturn
   */
  export type CafeMenuItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CafeMenuItem
     */
    select?: CafeMenuItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CafeMenuItem
     */
    omit?: CafeMenuItemOmit<ExtArgs> | null
    /**
     * The data used to create many CafeMenuItems.
     */
    data: CafeMenuItemCreateManyInput | CafeMenuItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CafeMenuItem update
   */
  export type CafeMenuItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CafeMenuItem
     */
    select?: CafeMenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CafeMenuItem
     */
    omit?: CafeMenuItemOmit<ExtArgs> | null
    /**
     * The data needed to update a CafeMenuItem.
     */
    data: XOR<CafeMenuItemUpdateInput, CafeMenuItemUncheckedUpdateInput>
    /**
     * Choose, which CafeMenuItem to update.
     */
    where: CafeMenuItemWhereUniqueInput
  }

  /**
   * CafeMenuItem updateMany
   */
  export type CafeMenuItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CafeMenuItems.
     */
    data: XOR<CafeMenuItemUpdateManyMutationInput, CafeMenuItemUncheckedUpdateManyInput>
    /**
     * Filter which CafeMenuItems to update
     */
    where?: CafeMenuItemWhereInput
    /**
     * Limit how many CafeMenuItems to update.
     */
    limit?: number
  }

  /**
   * CafeMenuItem updateManyAndReturn
   */
  export type CafeMenuItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CafeMenuItem
     */
    select?: CafeMenuItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CafeMenuItem
     */
    omit?: CafeMenuItemOmit<ExtArgs> | null
    /**
     * The data used to update CafeMenuItems.
     */
    data: XOR<CafeMenuItemUpdateManyMutationInput, CafeMenuItemUncheckedUpdateManyInput>
    /**
     * Filter which CafeMenuItems to update
     */
    where?: CafeMenuItemWhereInput
    /**
     * Limit how many CafeMenuItems to update.
     */
    limit?: number
  }

  /**
   * CafeMenuItem upsert
   */
  export type CafeMenuItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CafeMenuItem
     */
    select?: CafeMenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CafeMenuItem
     */
    omit?: CafeMenuItemOmit<ExtArgs> | null
    /**
     * The filter to search for the CafeMenuItem to update in case it exists.
     */
    where: CafeMenuItemWhereUniqueInput
    /**
     * In case the CafeMenuItem found by the `where` argument doesn't exist, create a new CafeMenuItem with this data.
     */
    create: XOR<CafeMenuItemCreateInput, CafeMenuItemUncheckedCreateInput>
    /**
     * In case the CafeMenuItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CafeMenuItemUpdateInput, CafeMenuItemUncheckedUpdateInput>
  }

  /**
   * CafeMenuItem delete
   */
  export type CafeMenuItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CafeMenuItem
     */
    select?: CafeMenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CafeMenuItem
     */
    omit?: CafeMenuItemOmit<ExtArgs> | null
    /**
     * Filter which CafeMenuItem to delete.
     */
    where: CafeMenuItemWhereUniqueInput
  }

  /**
   * CafeMenuItem deleteMany
   */
  export type CafeMenuItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CafeMenuItems to delete
     */
    where?: CafeMenuItemWhereInput
    /**
     * Limit how many CafeMenuItems to delete.
     */
    limit?: number
  }

  /**
   * CafeMenuItem without action
   */
  export type CafeMenuItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CafeMenuItem
     */
    select?: CafeMenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CafeMenuItem
     */
    omit?: CafeMenuItemOmit<ExtArgs> | null
  }


  /**
   * Model NewsletterSubscription
   */

  export type AggregateNewsletterSubscription = {
    _count: NewsletterSubscriptionCountAggregateOutputType | null
    _min: NewsletterSubscriptionMinAggregateOutputType | null
    _max: NewsletterSubscriptionMaxAggregateOutputType | null
  }

  export type NewsletterSubscriptionMinAggregateOutputType = {
    id: string | null
    email: string | null
    subscribedAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsletterSubscriptionMaxAggregateOutputType = {
    id: string | null
    email: string | null
    subscribedAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsletterSubscriptionCountAggregateOutputType = {
    id: number
    email: number
    subscribedAt: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NewsletterSubscriptionMinAggregateInputType = {
    id?: true
    email?: true
    subscribedAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsletterSubscriptionMaxAggregateInputType = {
    id?: true
    email?: true
    subscribedAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsletterSubscriptionCountAggregateInputType = {
    id?: true
    email?: true
    subscribedAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NewsletterSubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterSubscription to aggregate.
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscriptions to fetch.
     */
    orderBy?: NewsletterSubscriptionOrderByWithRelationInput | NewsletterSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewsletterSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NewsletterSubscriptions
    **/
    _count?: true | NewsletterSubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsletterSubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsletterSubscriptionMaxAggregateInputType
  }

  export type GetNewsletterSubscriptionAggregateType<T extends NewsletterSubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateNewsletterSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewsletterSubscription[P]>
      : GetScalarType<T[P], AggregateNewsletterSubscription[P]>
  }




  export type NewsletterSubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsletterSubscriptionWhereInput
    orderBy?: NewsletterSubscriptionOrderByWithAggregationInput | NewsletterSubscriptionOrderByWithAggregationInput[]
    by: NewsletterSubscriptionScalarFieldEnum[] | NewsletterSubscriptionScalarFieldEnum
    having?: NewsletterSubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsletterSubscriptionCountAggregateInputType | true
    _min?: NewsletterSubscriptionMinAggregateInputType
    _max?: NewsletterSubscriptionMaxAggregateInputType
  }

  export type NewsletterSubscriptionGroupByOutputType = {
    id: string
    email: string
    subscribedAt: Date
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: NewsletterSubscriptionCountAggregateOutputType | null
    _min: NewsletterSubscriptionMinAggregateOutputType | null
    _max: NewsletterSubscriptionMaxAggregateOutputType | null
  }

  type GetNewsletterSubscriptionGroupByPayload<T extends NewsletterSubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsletterSubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsletterSubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsletterSubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], NewsletterSubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type NewsletterSubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    subscribedAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsletterSubscription"]>

  export type NewsletterSubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    subscribedAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsletterSubscription"]>

  export type NewsletterSubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    subscribedAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsletterSubscription"]>

  export type NewsletterSubscriptionSelectScalar = {
    id?: boolean
    email?: boolean
    subscribedAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NewsletterSubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "subscribedAt" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["newsletterSubscription"]>

  export type $NewsletterSubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NewsletterSubscription"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      subscribedAt: Date
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["newsletterSubscription"]>
    composites: {}
  }

  type NewsletterSubscriptionGetPayload<S extends boolean | null | undefined | NewsletterSubscriptionDefaultArgs> = $Result.GetResult<Prisma.$NewsletterSubscriptionPayload, S>

  type NewsletterSubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NewsletterSubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewsletterSubscriptionCountAggregateInputType | true
    }

  export interface NewsletterSubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NewsletterSubscription'], meta: { name: 'NewsletterSubscription' } }
    /**
     * Find zero or one NewsletterSubscription that matches the filter.
     * @param {NewsletterSubscriptionFindUniqueArgs} args - Arguments to find a NewsletterSubscription
     * @example
     * // Get one NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewsletterSubscriptionFindUniqueArgs>(args: SelectSubset<T, NewsletterSubscriptionFindUniqueArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NewsletterSubscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NewsletterSubscriptionFindUniqueOrThrowArgs} args - Arguments to find a NewsletterSubscription
     * @example
     * // Get one NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewsletterSubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, NewsletterSubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterSubscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionFindFirstArgs} args - Arguments to find a NewsletterSubscription
     * @example
     * // Get one NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewsletterSubscriptionFindFirstArgs>(args?: SelectSubset<T, NewsletterSubscriptionFindFirstArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterSubscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionFindFirstOrThrowArgs} args - Arguments to find a NewsletterSubscription
     * @example
     * // Get one NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewsletterSubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, NewsletterSubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NewsletterSubscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewsletterSubscriptions
     * const newsletterSubscriptions = await prisma.newsletterSubscription.findMany()
     * 
     * // Get first 10 NewsletterSubscriptions
     * const newsletterSubscriptions = await prisma.newsletterSubscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newsletterSubscriptionWithIdOnly = await prisma.newsletterSubscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewsletterSubscriptionFindManyArgs>(args?: SelectSubset<T, NewsletterSubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NewsletterSubscription.
     * @param {NewsletterSubscriptionCreateArgs} args - Arguments to create a NewsletterSubscription.
     * @example
     * // Create one NewsletterSubscription
     * const NewsletterSubscription = await prisma.newsletterSubscription.create({
     *   data: {
     *     // ... data to create a NewsletterSubscription
     *   }
     * })
     * 
     */
    create<T extends NewsletterSubscriptionCreateArgs>(args: SelectSubset<T, NewsletterSubscriptionCreateArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NewsletterSubscriptions.
     * @param {NewsletterSubscriptionCreateManyArgs} args - Arguments to create many NewsletterSubscriptions.
     * @example
     * // Create many NewsletterSubscriptions
     * const newsletterSubscription = await prisma.newsletterSubscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewsletterSubscriptionCreateManyArgs>(args?: SelectSubset<T, NewsletterSubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NewsletterSubscriptions and returns the data saved in the database.
     * @param {NewsletterSubscriptionCreateManyAndReturnArgs} args - Arguments to create many NewsletterSubscriptions.
     * @example
     * // Create many NewsletterSubscriptions
     * const newsletterSubscription = await prisma.newsletterSubscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NewsletterSubscriptions and only return the `id`
     * const newsletterSubscriptionWithIdOnly = await prisma.newsletterSubscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NewsletterSubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, NewsletterSubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NewsletterSubscription.
     * @param {NewsletterSubscriptionDeleteArgs} args - Arguments to delete one NewsletterSubscription.
     * @example
     * // Delete one NewsletterSubscription
     * const NewsletterSubscription = await prisma.newsletterSubscription.delete({
     *   where: {
     *     // ... filter to delete one NewsletterSubscription
     *   }
     * })
     * 
     */
    delete<T extends NewsletterSubscriptionDeleteArgs>(args: SelectSubset<T, NewsletterSubscriptionDeleteArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NewsletterSubscription.
     * @param {NewsletterSubscriptionUpdateArgs} args - Arguments to update one NewsletterSubscription.
     * @example
     * // Update one NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewsletterSubscriptionUpdateArgs>(args: SelectSubset<T, NewsletterSubscriptionUpdateArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NewsletterSubscriptions.
     * @param {NewsletterSubscriptionDeleteManyArgs} args - Arguments to filter NewsletterSubscriptions to delete.
     * @example
     * // Delete a few NewsletterSubscriptions
     * const { count } = await prisma.newsletterSubscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewsletterSubscriptionDeleteManyArgs>(args?: SelectSubset<T, NewsletterSubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewsletterSubscriptions
     * const newsletterSubscription = await prisma.newsletterSubscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewsletterSubscriptionUpdateManyArgs>(args: SelectSubset<T, NewsletterSubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterSubscriptions and returns the data updated in the database.
     * @param {NewsletterSubscriptionUpdateManyAndReturnArgs} args - Arguments to update many NewsletterSubscriptions.
     * @example
     * // Update many NewsletterSubscriptions
     * const newsletterSubscription = await prisma.newsletterSubscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NewsletterSubscriptions and only return the `id`
     * const newsletterSubscriptionWithIdOnly = await prisma.newsletterSubscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NewsletterSubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, NewsletterSubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NewsletterSubscription.
     * @param {NewsletterSubscriptionUpsertArgs} args - Arguments to update or create a NewsletterSubscription.
     * @example
     * // Update or create a NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.upsert({
     *   create: {
     *     // ... data to create a NewsletterSubscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewsletterSubscription we want to update
     *   }
     * })
     */
    upsert<T extends NewsletterSubscriptionUpsertArgs>(args: SelectSubset<T, NewsletterSubscriptionUpsertArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NewsletterSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionCountArgs} args - Arguments to filter NewsletterSubscriptions to count.
     * @example
     * // Count the number of NewsletterSubscriptions
     * const count = await prisma.newsletterSubscription.count({
     *   where: {
     *     // ... the filter for the NewsletterSubscriptions we want to count
     *   }
     * })
    **/
    count<T extends NewsletterSubscriptionCountArgs>(
      args?: Subset<T, NewsletterSubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsletterSubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewsletterSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NewsletterSubscriptionAggregateArgs>(args: Subset<T, NewsletterSubscriptionAggregateArgs>): Prisma.PrismaPromise<GetNewsletterSubscriptionAggregateType<T>>

    /**
     * Group by NewsletterSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NewsletterSubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewsletterSubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: NewsletterSubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NewsletterSubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsletterSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NewsletterSubscription model
   */
  readonly fields: NewsletterSubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NewsletterSubscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewsletterSubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NewsletterSubscription model
   */
  interface NewsletterSubscriptionFieldRefs {
    readonly id: FieldRef<"NewsletterSubscription", 'String'>
    readonly email: FieldRef<"NewsletterSubscription", 'String'>
    readonly subscribedAt: FieldRef<"NewsletterSubscription", 'DateTime'>
    readonly isActive: FieldRef<"NewsletterSubscription", 'Boolean'>
    readonly createdAt: FieldRef<"NewsletterSubscription", 'DateTime'>
    readonly updatedAt: FieldRef<"NewsletterSubscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NewsletterSubscription findUnique
   */
  export type NewsletterSubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscription to fetch.
     */
    where: NewsletterSubscriptionWhereUniqueInput
  }

  /**
   * NewsletterSubscription findUniqueOrThrow
   */
  export type NewsletterSubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscription to fetch.
     */
    where: NewsletterSubscriptionWhereUniqueInput
  }

  /**
   * NewsletterSubscription findFirst
   */
  export type NewsletterSubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscription to fetch.
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscriptions to fetch.
     */
    orderBy?: NewsletterSubscriptionOrderByWithRelationInput | NewsletterSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterSubscriptions.
     */
    cursor?: NewsletterSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterSubscriptions.
     */
    distinct?: NewsletterSubscriptionScalarFieldEnum | NewsletterSubscriptionScalarFieldEnum[]
  }

  /**
   * NewsletterSubscription findFirstOrThrow
   */
  export type NewsletterSubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscription to fetch.
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscriptions to fetch.
     */
    orderBy?: NewsletterSubscriptionOrderByWithRelationInput | NewsletterSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterSubscriptions.
     */
    cursor?: NewsletterSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterSubscriptions.
     */
    distinct?: NewsletterSubscriptionScalarFieldEnum | NewsletterSubscriptionScalarFieldEnum[]
  }

  /**
   * NewsletterSubscription findMany
   */
  export type NewsletterSubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscriptions to fetch.
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscriptions to fetch.
     */
    orderBy?: NewsletterSubscriptionOrderByWithRelationInput | NewsletterSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NewsletterSubscriptions.
     */
    cursor?: NewsletterSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscriptions.
     */
    skip?: number
    distinct?: NewsletterSubscriptionScalarFieldEnum | NewsletterSubscriptionScalarFieldEnum[]
  }

  /**
   * NewsletterSubscription create
   */
  export type NewsletterSubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * The data needed to create a NewsletterSubscription.
     */
    data: XOR<NewsletterSubscriptionCreateInput, NewsletterSubscriptionUncheckedCreateInput>
  }

  /**
   * NewsletterSubscription createMany
   */
  export type NewsletterSubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NewsletterSubscriptions.
     */
    data: NewsletterSubscriptionCreateManyInput | NewsletterSubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsletterSubscription createManyAndReturn
   */
  export type NewsletterSubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many NewsletterSubscriptions.
     */
    data: NewsletterSubscriptionCreateManyInput | NewsletterSubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsletterSubscription update
   */
  export type NewsletterSubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * The data needed to update a NewsletterSubscription.
     */
    data: XOR<NewsletterSubscriptionUpdateInput, NewsletterSubscriptionUncheckedUpdateInput>
    /**
     * Choose, which NewsletterSubscription to update.
     */
    where: NewsletterSubscriptionWhereUniqueInput
  }

  /**
   * NewsletterSubscription updateMany
   */
  export type NewsletterSubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NewsletterSubscriptions.
     */
    data: XOR<NewsletterSubscriptionUpdateManyMutationInput, NewsletterSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which NewsletterSubscriptions to update
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * Limit how many NewsletterSubscriptions to update.
     */
    limit?: number
  }

  /**
   * NewsletterSubscription updateManyAndReturn
   */
  export type NewsletterSubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update NewsletterSubscriptions.
     */
    data: XOR<NewsletterSubscriptionUpdateManyMutationInput, NewsletterSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which NewsletterSubscriptions to update
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * Limit how many NewsletterSubscriptions to update.
     */
    limit?: number
  }

  /**
   * NewsletterSubscription upsert
   */
  export type NewsletterSubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * The filter to search for the NewsletterSubscription to update in case it exists.
     */
    where: NewsletterSubscriptionWhereUniqueInput
    /**
     * In case the NewsletterSubscription found by the `where` argument doesn't exist, create a new NewsletterSubscription with this data.
     */
    create: XOR<NewsletterSubscriptionCreateInput, NewsletterSubscriptionUncheckedCreateInput>
    /**
     * In case the NewsletterSubscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewsletterSubscriptionUpdateInput, NewsletterSubscriptionUncheckedUpdateInput>
  }

  /**
   * NewsletterSubscription delete
   */
  export type NewsletterSubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter which NewsletterSubscription to delete.
     */
    where: NewsletterSubscriptionWhereUniqueInput
  }

  /**
   * NewsletterSubscription deleteMany
   */
  export type NewsletterSubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterSubscriptions to delete
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * Limit how many NewsletterSubscriptions to delete.
     */
    limit?: number
  }

  /**
   * NewsletterSubscription without action
   */
  export type NewsletterSubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const ServiceRequestScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    serviceId: 'serviceId',
    details: 'details',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceRequestScalarFieldEnum = (typeof ServiceRequestScalarFieldEnum)[keyof typeof ServiceRequestScalarFieldEnum]


  export const TrainingCourseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    duration: 'duration',
    price: 'price',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TrainingCourseScalarFieldEnum = (typeof TrainingCourseScalarFieldEnum)[keyof typeof TrainingCourseScalarFieldEnum]


  export const BusinessRegistrationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    businessName: 'businessName',
    businessType: 'businessType',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BusinessRegistrationScalarFieldEnum = (typeof BusinessRegistrationScalarFieldEnum)[keyof typeof BusinessRegistrationScalarFieldEnum]


  export const CafeMenuItemScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    price: 'price',
    category: 'category',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CafeMenuItemScalarFieldEnum = (typeof CafeMenuItemScalarFieldEnum)[keyof typeof CafeMenuItemScalarFieldEnum]


  export const NewsletterSubscriptionScalarFieldEnum: {
    id: 'id',
    email: 'email',
    subscribedAt: 'subscribedAt',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NewsletterSubscriptionScalarFieldEnum = (typeof NewsletterSubscriptionScalarFieldEnum)[keyof typeof NewsletterSubscriptionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    serviceRequests?: ServiceRequestListRelationFilter
    businessRegistrations?: BusinessRegistrationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    serviceRequests?: ServiceRequestOrderByRelationAggregateInput
    businessRegistrations?: BusinessRegistrationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    serviceRequests?: ServiceRequestListRelationFilter
    businessRegistrations?: BusinessRegistrationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    description?: StringFilter<"Service"> | string
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    serviceRequests?: ServiceRequestListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    serviceRequests?: ServiceRequestOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    description?: StringFilter<"Service"> | string
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    serviceRequests?: ServiceRequestListRelationFilter
  }, "id" | "name">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    name?: StringWithAggregatesFilter<"Service"> | string
    description?: StringWithAggregatesFilter<"Service"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type ServiceRequestWhereInput = {
    AND?: ServiceRequestWhereInput | ServiceRequestWhereInput[]
    OR?: ServiceRequestWhereInput[]
    NOT?: ServiceRequestWhereInput | ServiceRequestWhereInput[]
    id?: StringFilter<"ServiceRequest"> | string
    userId?: StringFilter<"ServiceRequest"> | string
    serviceId?: StringFilter<"ServiceRequest"> | string
    details?: StringFilter<"ServiceRequest"> | string
    status?: StringFilter<"ServiceRequest"> | string
    createdAt?: DateTimeFilter<"ServiceRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceRequest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }

  export type ServiceRequestOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    details?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
  }

  export type ServiceRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceRequestWhereInput | ServiceRequestWhereInput[]
    OR?: ServiceRequestWhereInput[]
    NOT?: ServiceRequestWhereInput | ServiceRequestWhereInput[]
    userId?: StringFilter<"ServiceRequest"> | string
    serviceId?: StringFilter<"ServiceRequest"> | string
    details?: StringFilter<"ServiceRequest"> | string
    status?: StringFilter<"ServiceRequest"> | string
    createdAt?: DateTimeFilter<"ServiceRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceRequest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }, "id">

  export type ServiceRequestOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    details?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceRequestCountOrderByAggregateInput
    _max?: ServiceRequestMaxOrderByAggregateInput
    _min?: ServiceRequestMinOrderByAggregateInput
  }

  export type ServiceRequestScalarWhereWithAggregatesInput = {
    AND?: ServiceRequestScalarWhereWithAggregatesInput | ServiceRequestScalarWhereWithAggregatesInput[]
    OR?: ServiceRequestScalarWhereWithAggregatesInput[]
    NOT?: ServiceRequestScalarWhereWithAggregatesInput | ServiceRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceRequest"> | string
    userId?: StringWithAggregatesFilter<"ServiceRequest"> | string
    serviceId?: StringWithAggregatesFilter<"ServiceRequest"> | string
    details?: StringWithAggregatesFilter<"ServiceRequest"> | string
    status?: StringWithAggregatesFilter<"ServiceRequest"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ServiceRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServiceRequest"> | Date | string
  }

  export type TrainingCourseWhereInput = {
    AND?: TrainingCourseWhereInput | TrainingCourseWhereInput[]
    OR?: TrainingCourseWhereInput[]
    NOT?: TrainingCourseWhereInput | TrainingCourseWhereInput[]
    id?: StringFilter<"TrainingCourse"> | string
    name?: StringFilter<"TrainingCourse"> | string
    description?: StringFilter<"TrainingCourse"> | string
    duration?: StringFilter<"TrainingCourse"> | string
    price?: FloatFilter<"TrainingCourse"> | number
    createdAt?: DateTimeFilter<"TrainingCourse"> | Date | string
    updatedAt?: DateTimeFilter<"TrainingCourse"> | Date | string
  }

  export type TrainingCourseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainingCourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrainingCourseWhereInput | TrainingCourseWhereInput[]
    OR?: TrainingCourseWhereInput[]
    NOT?: TrainingCourseWhereInput | TrainingCourseWhereInput[]
    name?: StringFilter<"TrainingCourse"> | string
    description?: StringFilter<"TrainingCourse"> | string
    duration?: StringFilter<"TrainingCourse"> | string
    price?: FloatFilter<"TrainingCourse"> | number
    createdAt?: DateTimeFilter<"TrainingCourse"> | Date | string
    updatedAt?: DateTimeFilter<"TrainingCourse"> | Date | string
  }, "id">

  export type TrainingCourseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TrainingCourseCountOrderByAggregateInput
    _avg?: TrainingCourseAvgOrderByAggregateInput
    _max?: TrainingCourseMaxOrderByAggregateInput
    _min?: TrainingCourseMinOrderByAggregateInput
    _sum?: TrainingCourseSumOrderByAggregateInput
  }

  export type TrainingCourseScalarWhereWithAggregatesInput = {
    AND?: TrainingCourseScalarWhereWithAggregatesInput | TrainingCourseScalarWhereWithAggregatesInput[]
    OR?: TrainingCourseScalarWhereWithAggregatesInput[]
    NOT?: TrainingCourseScalarWhereWithAggregatesInput | TrainingCourseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrainingCourse"> | string
    name?: StringWithAggregatesFilter<"TrainingCourse"> | string
    description?: StringWithAggregatesFilter<"TrainingCourse"> | string
    duration?: StringWithAggregatesFilter<"TrainingCourse"> | string
    price?: FloatWithAggregatesFilter<"TrainingCourse"> | number
    createdAt?: DateTimeWithAggregatesFilter<"TrainingCourse"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TrainingCourse"> | Date | string
  }

  export type BusinessRegistrationWhereInput = {
    AND?: BusinessRegistrationWhereInput | BusinessRegistrationWhereInput[]
    OR?: BusinessRegistrationWhereInput[]
    NOT?: BusinessRegistrationWhereInput | BusinessRegistrationWhereInput[]
    id?: StringFilter<"BusinessRegistration"> | string
    userId?: StringFilter<"BusinessRegistration"> | string
    businessName?: StringFilter<"BusinessRegistration"> | string
    businessType?: StringFilter<"BusinessRegistration"> | string
    status?: StringFilter<"BusinessRegistration"> | string
    createdAt?: DateTimeFilter<"BusinessRegistration"> | Date | string
    updatedAt?: DateTimeFilter<"BusinessRegistration"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BusinessRegistrationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    businessType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type BusinessRegistrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BusinessRegistrationWhereInput | BusinessRegistrationWhereInput[]
    OR?: BusinessRegistrationWhereInput[]
    NOT?: BusinessRegistrationWhereInput | BusinessRegistrationWhereInput[]
    userId?: StringFilter<"BusinessRegistration"> | string
    businessName?: StringFilter<"BusinessRegistration"> | string
    businessType?: StringFilter<"BusinessRegistration"> | string
    status?: StringFilter<"BusinessRegistration"> | string
    createdAt?: DateTimeFilter<"BusinessRegistration"> | Date | string
    updatedAt?: DateTimeFilter<"BusinessRegistration"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type BusinessRegistrationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    businessType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BusinessRegistrationCountOrderByAggregateInput
    _max?: BusinessRegistrationMaxOrderByAggregateInput
    _min?: BusinessRegistrationMinOrderByAggregateInput
  }

  export type BusinessRegistrationScalarWhereWithAggregatesInput = {
    AND?: BusinessRegistrationScalarWhereWithAggregatesInput | BusinessRegistrationScalarWhereWithAggregatesInput[]
    OR?: BusinessRegistrationScalarWhereWithAggregatesInput[]
    NOT?: BusinessRegistrationScalarWhereWithAggregatesInput | BusinessRegistrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BusinessRegistration"> | string
    userId?: StringWithAggregatesFilter<"BusinessRegistration"> | string
    businessName?: StringWithAggregatesFilter<"BusinessRegistration"> | string
    businessType?: StringWithAggregatesFilter<"BusinessRegistration"> | string
    status?: StringWithAggregatesFilter<"BusinessRegistration"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BusinessRegistration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BusinessRegistration"> | Date | string
  }

  export type CafeMenuItemWhereInput = {
    AND?: CafeMenuItemWhereInput | CafeMenuItemWhereInput[]
    OR?: CafeMenuItemWhereInput[]
    NOT?: CafeMenuItemWhereInput | CafeMenuItemWhereInput[]
    id?: StringFilter<"CafeMenuItem"> | string
    name?: StringFilter<"CafeMenuItem"> | string
    description?: StringFilter<"CafeMenuItem"> | string
    price?: FloatFilter<"CafeMenuItem"> | number
    category?: StringFilter<"CafeMenuItem"> | string
    createdAt?: DateTimeFilter<"CafeMenuItem"> | Date | string
    updatedAt?: DateTimeFilter<"CafeMenuItem"> | Date | string
  }

  export type CafeMenuItemOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CafeMenuItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CafeMenuItemWhereInput | CafeMenuItemWhereInput[]
    OR?: CafeMenuItemWhereInput[]
    NOT?: CafeMenuItemWhereInput | CafeMenuItemWhereInput[]
    name?: StringFilter<"CafeMenuItem"> | string
    description?: StringFilter<"CafeMenuItem"> | string
    price?: FloatFilter<"CafeMenuItem"> | number
    category?: StringFilter<"CafeMenuItem"> | string
    createdAt?: DateTimeFilter<"CafeMenuItem"> | Date | string
    updatedAt?: DateTimeFilter<"CafeMenuItem"> | Date | string
  }, "id">

  export type CafeMenuItemOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CafeMenuItemCountOrderByAggregateInput
    _avg?: CafeMenuItemAvgOrderByAggregateInput
    _max?: CafeMenuItemMaxOrderByAggregateInput
    _min?: CafeMenuItemMinOrderByAggregateInput
    _sum?: CafeMenuItemSumOrderByAggregateInput
  }

  export type CafeMenuItemScalarWhereWithAggregatesInput = {
    AND?: CafeMenuItemScalarWhereWithAggregatesInput | CafeMenuItemScalarWhereWithAggregatesInput[]
    OR?: CafeMenuItemScalarWhereWithAggregatesInput[]
    NOT?: CafeMenuItemScalarWhereWithAggregatesInput | CafeMenuItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CafeMenuItem"> | string
    name?: StringWithAggregatesFilter<"CafeMenuItem"> | string
    description?: StringWithAggregatesFilter<"CafeMenuItem"> | string
    price?: FloatWithAggregatesFilter<"CafeMenuItem"> | number
    category?: StringWithAggregatesFilter<"CafeMenuItem"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CafeMenuItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CafeMenuItem"> | Date | string
  }

  export type NewsletterSubscriptionWhereInput = {
    AND?: NewsletterSubscriptionWhereInput | NewsletterSubscriptionWhereInput[]
    OR?: NewsletterSubscriptionWhereInput[]
    NOT?: NewsletterSubscriptionWhereInput | NewsletterSubscriptionWhereInput[]
    id?: StringFilter<"NewsletterSubscription"> | string
    email?: StringFilter<"NewsletterSubscription"> | string
    subscribedAt?: DateTimeFilter<"NewsletterSubscription"> | Date | string
    isActive?: BoolFilter<"NewsletterSubscription"> | boolean
    createdAt?: DateTimeFilter<"NewsletterSubscription"> | Date | string
    updatedAt?: DateTimeFilter<"NewsletterSubscription"> | Date | string
  }

  export type NewsletterSubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    subscribedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsletterSubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: NewsletterSubscriptionWhereInput | NewsletterSubscriptionWhereInput[]
    OR?: NewsletterSubscriptionWhereInput[]
    NOT?: NewsletterSubscriptionWhereInput | NewsletterSubscriptionWhereInput[]
    subscribedAt?: DateTimeFilter<"NewsletterSubscription"> | Date | string
    isActive?: BoolFilter<"NewsletterSubscription"> | boolean
    createdAt?: DateTimeFilter<"NewsletterSubscription"> | Date | string
    updatedAt?: DateTimeFilter<"NewsletterSubscription"> | Date | string
  }, "id" | "email">

  export type NewsletterSubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    subscribedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NewsletterSubscriptionCountOrderByAggregateInput
    _max?: NewsletterSubscriptionMaxOrderByAggregateInput
    _min?: NewsletterSubscriptionMinOrderByAggregateInput
  }

  export type NewsletterSubscriptionScalarWhereWithAggregatesInput = {
    AND?: NewsletterSubscriptionScalarWhereWithAggregatesInput | NewsletterSubscriptionScalarWhereWithAggregatesInput[]
    OR?: NewsletterSubscriptionScalarWhereWithAggregatesInput[]
    NOT?: NewsletterSubscriptionScalarWhereWithAggregatesInput | NewsletterSubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NewsletterSubscription"> | string
    email?: StringWithAggregatesFilter<"NewsletterSubscription"> | string
    subscribedAt?: DateTimeWithAggregatesFilter<"NewsletterSubscription"> | Date | string
    isActive?: BoolWithAggregatesFilter<"NewsletterSubscription"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"NewsletterSubscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NewsletterSubscription"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceRequests?: ServiceRequestCreateNestedManyWithoutUserInput
    businessRegistrations?: BusinessRegistrationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceRequests?: ServiceRequestUncheckedCreateNestedManyWithoutUserInput
    businessRegistrations?: BusinessRegistrationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceRequests?: ServiceRequestUpdateManyWithoutUserNestedInput
    businessRegistrations?: BusinessRegistrationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceRequests?: ServiceRequestUncheckedUpdateManyWithoutUserNestedInput
    businessRegistrations?: BusinessRegistrationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateInput = {
    id?: string
    name: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceRequests?: ServiceRequestCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceRequests?: ServiceRequestUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceRequests?: ServiceRequestUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceRequests?: ServiceRequestUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    name: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRequestCreateInput = {
    id?: string
    details: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutServiceRequestsInput
    service: ServiceCreateNestedOneWithoutServiceRequestsInput
  }

  export type ServiceRequestUncheckedCreateInput = {
    id?: string
    userId: string
    serviceId: string
    details: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutServiceRequestsNestedInput
    service?: ServiceUpdateOneRequiredWithoutServiceRequestsNestedInput
  }

  export type ServiceRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRequestCreateManyInput = {
    id?: string
    userId: string
    serviceId: string
    details: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingCourseCreateInput = {
    id?: string
    name: string
    description: string
    duration: string
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainingCourseUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    duration: string
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainingCourseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingCourseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingCourseCreateManyInput = {
    id?: string
    name: string
    description: string
    duration: string
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainingCourseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingCourseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessRegistrationCreateInput = {
    id?: string
    businessName: string
    businessType: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBusinessRegistrationsInput
  }

  export type BusinessRegistrationUncheckedCreateInput = {
    id?: string
    userId: string
    businessName: string
    businessType: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusinessRegistrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBusinessRegistrationsNestedInput
  }

  export type BusinessRegistrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessRegistrationCreateManyInput = {
    id?: string
    userId: string
    businessName: string
    businessType: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusinessRegistrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessRegistrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CafeMenuItemCreateInput = {
    id?: string
    name: string
    description: string
    price: number
    category: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CafeMenuItemUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    price: number
    category: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CafeMenuItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CafeMenuItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CafeMenuItemCreateManyInput = {
    id?: string
    name: string
    description: string
    price: number
    category: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CafeMenuItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CafeMenuItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriptionCreateInput = {
    id?: string
    email: string
    subscribedAt?: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsletterSubscriptionUncheckedCreateInput = {
    id?: string
    email: string
    subscribedAt?: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsletterSubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subscribedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subscribedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriptionCreateManyInput = {
    id?: string
    email: string
    subscribedAt?: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsletterSubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subscribedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subscribedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ServiceRequestListRelationFilter = {
    every?: ServiceRequestWhereInput
    some?: ServiceRequestWhereInput
    none?: ServiceRequestWhereInput
  }

  export type BusinessRegistrationListRelationFilter = {
    every?: BusinessRegistrationWhereInput
    some?: BusinessRegistrationWhereInput
    none?: BusinessRegistrationWhereInput
  }

  export type ServiceRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BusinessRegistrationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ServiceScalarRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type ServiceRequestCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    details?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    details?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceRequestMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    details?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type TrainingCourseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainingCourseAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type TrainingCourseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainingCourseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainingCourseSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BusinessRegistrationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    businessType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessRegistrationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    businessType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessRegistrationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    businessType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CafeMenuItemCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CafeMenuItemAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type CafeMenuItemMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CafeMenuItemMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CafeMenuItemSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NewsletterSubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    subscribedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsletterSubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    subscribedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsletterSubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    subscribedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ServiceRequestCreateNestedManyWithoutUserInput = {
    create?: XOR<ServiceRequestCreateWithoutUserInput, ServiceRequestUncheckedCreateWithoutUserInput> | ServiceRequestCreateWithoutUserInput[] | ServiceRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServiceRequestCreateOrConnectWithoutUserInput | ServiceRequestCreateOrConnectWithoutUserInput[]
    createMany?: ServiceRequestCreateManyUserInputEnvelope
    connect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
  }

  export type BusinessRegistrationCreateNestedManyWithoutUserInput = {
    create?: XOR<BusinessRegistrationCreateWithoutUserInput, BusinessRegistrationUncheckedCreateWithoutUserInput> | BusinessRegistrationCreateWithoutUserInput[] | BusinessRegistrationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BusinessRegistrationCreateOrConnectWithoutUserInput | BusinessRegistrationCreateOrConnectWithoutUserInput[]
    createMany?: BusinessRegistrationCreateManyUserInputEnvelope
    connect?: BusinessRegistrationWhereUniqueInput | BusinessRegistrationWhereUniqueInput[]
  }

  export type ServiceRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ServiceRequestCreateWithoutUserInput, ServiceRequestUncheckedCreateWithoutUserInput> | ServiceRequestCreateWithoutUserInput[] | ServiceRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServiceRequestCreateOrConnectWithoutUserInput | ServiceRequestCreateOrConnectWithoutUserInput[]
    createMany?: ServiceRequestCreateManyUserInputEnvelope
    connect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
  }

  export type BusinessRegistrationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BusinessRegistrationCreateWithoutUserInput, BusinessRegistrationUncheckedCreateWithoutUserInput> | BusinessRegistrationCreateWithoutUserInput[] | BusinessRegistrationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BusinessRegistrationCreateOrConnectWithoutUserInput | BusinessRegistrationCreateOrConnectWithoutUserInput[]
    createMany?: BusinessRegistrationCreateManyUserInputEnvelope
    connect?: BusinessRegistrationWhereUniqueInput | BusinessRegistrationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ServiceRequestUpdateManyWithoutUserNestedInput = {
    create?: XOR<ServiceRequestCreateWithoutUserInput, ServiceRequestUncheckedCreateWithoutUserInput> | ServiceRequestCreateWithoutUserInput[] | ServiceRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServiceRequestCreateOrConnectWithoutUserInput | ServiceRequestCreateOrConnectWithoutUserInput[]
    upsert?: ServiceRequestUpsertWithWhereUniqueWithoutUserInput | ServiceRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ServiceRequestCreateManyUserInputEnvelope
    set?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    disconnect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    delete?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    connect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    update?: ServiceRequestUpdateWithWhereUniqueWithoutUserInput | ServiceRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ServiceRequestUpdateManyWithWhereWithoutUserInput | ServiceRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ServiceRequestScalarWhereInput | ServiceRequestScalarWhereInput[]
  }

  export type BusinessRegistrationUpdateManyWithoutUserNestedInput = {
    create?: XOR<BusinessRegistrationCreateWithoutUserInput, BusinessRegistrationUncheckedCreateWithoutUserInput> | BusinessRegistrationCreateWithoutUserInput[] | BusinessRegistrationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BusinessRegistrationCreateOrConnectWithoutUserInput | BusinessRegistrationCreateOrConnectWithoutUserInput[]
    upsert?: BusinessRegistrationUpsertWithWhereUniqueWithoutUserInput | BusinessRegistrationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BusinessRegistrationCreateManyUserInputEnvelope
    set?: BusinessRegistrationWhereUniqueInput | BusinessRegistrationWhereUniqueInput[]
    disconnect?: BusinessRegistrationWhereUniqueInput | BusinessRegistrationWhereUniqueInput[]
    delete?: BusinessRegistrationWhereUniqueInput | BusinessRegistrationWhereUniqueInput[]
    connect?: BusinessRegistrationWhereUniqueInput | BusinessRegistrationWhereUniqueInput[]
    update?: BusinessRegistrationUpdateWithWhereUniqueWithoutUserInput | BusinessRegistrationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BusinessRegistrationUpdateManyWithWhereWithoutUserInput | BusinessRegistrationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BusinessRegistrationScalarWhereInput | BusinessRegistrationScalarWhereInput[]
  }

  export type ServiceRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ServiceRequestCreateWithoutUserInput, ServiceRequestUncheckedCreateWithoutUserInput> | ServiceRequestCreateWithoutUserInput[] | ServiceRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServiceRequestCreateOrConnectWithoutUserInput | ServiceRequestCreateOrConnectWithoutUserInput[]
    upsert?: ServiceRequestUpsertWithWhereUniqueWithoutUserInput | ServiceRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ServiceRequestCreateManyUserInputEnvelope
    set?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    disconnect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    delete?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    connect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    update?: ServiceRequestUpdateWithWhereUniqueWithoutUserInput | ServiceRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ServiceRequestUpdateManyWithWhereWithoutUserInput | ServiceRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ServiceRequestScalarWhereInput | ServiceRequestScalarWhereInput[]
  }

  export type BusinessRegistrationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BusinessRegistrationCreateWithoutUserInput, BusinessRegistrationUncheckedCreateWithoutUserInput> | BusinessRegistrationCreateWithoutUserInput[] | BusinessRegistrationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BusinessRegistrationCreateOrConnectWithoutUserInput | BusinessRegistrationCreateOrConnectWithoutUserInput[]
    upsert?: BusinessRegistrationUpsertWithWhereUniqueWithoutUserInput | BusinessRegistrationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BusinessRegistrationCreateManyUserInputEnvelope
    set?: BusinessRegistrationWhereUniqueInput | BusinessRegistrationWhereUniqueInput[]
    disconnect?: BusinessRegistrationWhereUniqueInput | BusinessRegistrationWhereUniqueInput[]
    delete?: BusinessRegistrationWhereUniqueInput | BusinessRegistrationWhereUniqueInput[]
    connect?: BusinessRegistrationWhereUniqueInput | BusinessRegistrationWhereUniqueInput[]
    update?: BusinessRegistrationUpdateWithWhereUniqueWithoutUserInput | BusinessRegistrationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BusinessRegistrationUpdateManyWithWhereWithoutUserInput | BusinessRegistrationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BusinessRegistrationScalarWhereInput | BusinessRegistrationScalarWhereInput[]
  }

  export type ServiceRequestCreateNestedManyWithoutServiceInput = {
    create?: XOR<ServiceRequestCreateWithoutServiceInput, ServiceRequestUncheckedCreateWithoutServiceInput> | ServiceRequestCreateWithoutServiceInput[] | ServiceRequestUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceRequestCreateOrConnectWithoutServiceInput | ServiceRequestCreateOrConnectWithoutServiceInput[]
    createMany?: ServiceRequestCreateManyServiceInputEnvelope
    connect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
  }

  export type ServiceRequestUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<ServiceRequestCreateWithoutServiceInput, ServiceRequestUncheckedCreateWithoutServiceInput> | ServiceRequestCreateWithoutServiceInput[] | ServiceRequestUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceRequestCreateOrConnectWithoutServiceInput | ServiceRequestCreateOrConnectWithoutServiceInput[]
    createMany?: ServiceRequestCreateManyServiceInputEnvelope
    connect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
  }

  export type ServiceRequestUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ServiceRequestCreateWithoutServiceInput, ServiceRequestUncheckedCreateWithoutServiceInput> | ServiceRequestCreateWithoutServiceInput[] | ServiceRequestUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceRequestCreateOrConnectWithoutServiceInput | ServiceRequestCreateOrConnectWithoutServiceInput[]
    upsert?: ServiceRequestUpsertWithWhereUniqueWithoutServiceInput | ServiceRequestUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ServiceRequestCreateManyServiceInputEnvelope
    set?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    disconnect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    delete?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    connect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    update?: ServiceRequestUpdateWithWhereUniqueWithoutServiceInput | ServiceRequestUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ServiceRequestUpdateManyWithWhereWithoutServiceInput | ServiceRequestUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ServiceRequestScalarWhereInput | ServiceRequestScalarWhereInput[]
  }

  export type ServiceRequestUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ServiceRequestCreateWithoutServiceInput, ServiceRequestUncheckedCreateWithoutServiceInput> | ServiceRequestCreateWithoutServiceInput[] | ServiceRequestUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceRequestCreateOrConnectWithoutServiceInput | ServiceRequestCreateOrConnectWithoutServiceInput[]
    upsert?: ServiceRequestUpsertWithWhereUniqueWithoutServiceInput | ServiceRequestUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ServiceRequestCreateManyServiceInputEnvelope
    set?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    disconnect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    delete?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    connect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    update?: ServiceRequestUpdateWithWhereUniqueWithoutServiceInput | ServiceRequestUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ServiceRequestUpdateManyWithWhereWithoutServiceInput | ServiceRequestUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ServiceRequestScalarWhereInput | ServiceRequestScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutServiceRequestsInput = {
    create?: XOR<UserCreateWithoutServiceRequestsInput, UserUncheckedCreateWithoutServiceRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutServiceRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutServiceRequestsInput = {
    create?: XOR<ServiceCreateWithoutServiceRequestsInput, ServiceUncheckedCreateWithoutServiceRequestsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutServiceRequestsInput
    connect?: ServiceWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutServiceRequestsNestedInput = {
    create?: XOR<UserCreateWithoutServiceRequestsInput, UserUncheckedCreateWithoutServiceRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutServiceRequestsInput
    upsert?: UserUpsertWithoutServiceRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutServiceRequestsInput, UserUpdateWithoutServiceRequestsInput>, UserUncheckedUpdateWithoutServiceRequestsInput>
  }

  export type ServiceUpdateOneRequiredWithoutServiceRequestsNestedInput = {
    create?: XOR<ServiceCreateWithoutServiceRequestsInput, ServiceUncheckedCreateWithoutServiceRequestsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutServiceRequestsInput
    upsert?: ServiceUpsertWithoutServiceRequestsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutServiceRequestsInput, ServiceUpdateWithoutServiceRequestsInput>, ServiceUncheckedUpdateWithoutServiceRequestsInput>
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutBusinessRegistrationsInput = {
    create?: XOR<UserCreateWithoutBusinessRegistrationsInput, UserUncheckedCreateWithoutBusinessRegistrationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBusinessRegistrationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBusinessRegistrationsNestedInput = {
    create?: XOR<UserCreateWithoutBusinessRegistrationsInput, UserUncheckedCreateWithoutBusinessRegistrationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBusinessRegistrationsInput
    upsert?: UserUpsertWithoutBusinessRegistrationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBusinessRegistrationsInput, UserUpdateWithoutBusinessRegistrationsInput>, UserUncheckedUpdateWithoutBusinessRegistrationsInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ServiceRequestCreateWithoutUserInput = {
    id?: string
    details: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    service: ServiceCreateNestedOneWithoutServiceRequestsInput
  }

  export type ServiceRequestUncheckedCreateWithoutUserInput = {
    id?: string
    serviceId: string
    details: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceRequestCreateOrConnectWithoutUserInput = {
    where: ServiceRequestWhereUniqueInput
    create: XOR<ServiceRequestCreateWithoutUserInput, ServiceRequestUncheckedCreateWithoutUserInput>
  }

  export type ServiceRequestCreateManyUserInputEnvelope = {
    data: ServiceRequestCreateManyUserInput | ServiceRequestCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BusinessRegistrationCreateWithoutUserInput = {
    id?: string
    businessName: string
    businessType: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusinessRegistrationUncheckedCreateWithoutUserInput = {
    id?: string
    businessName: string
    businessType: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusinessRegistrationCreateOrConnectWithoutUserInput = {
    where: BusinessRegistrationWhereUniqueInput
    create: XOR<BusinessRegistrationCreateWithoutUserInput, BusinessRegistrationUncheckedCreateWithoutUserInput>
  }

  export type BusinessRegistrationCreateManyUserInputEnvelope = {
    data: BusinessRegistrationCreateManyUserInput | BusinessRegistrationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ServiceRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: ServiceRequestWhereUniqueInput
    update: XOR<ServiceRequestUpdateWithoutUserInput, ServiceRequestUncheckedUpdateWithoutUserInput>
    create: XOR<ServiceRequestCreateWithoutUserInput, ServiceRequestUncheckedCreateWithoutUserInput>
  }

  export type ServiceRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: ServiceRequestWhereUniqueInput
    data: XOR<ServiceRequestUpdateWithoutUserInput, ServiceRequestUncheckedUpdateWithoutUserInput>
  }

  export type ServiceRequestUpdateManyWithWhereWithoutUserInput = {
    where: ServiceRequestScalarWhereInput
    data: XOR<ServiceRequestUpdateManyMutationInput, ServiceRequestUncheckedUpdateManyWithoutUserInput>
  }

  export type ServiceRequestScalarWhereInput = {
    AND?: ServiceRequestScalarWhereInput | ServiceRequestScalarWhereInput[]
    OR?: ServiceRequestScalarWhereInput[]
    NOT?: ServiceRequestScalarWhereInput | ServiceRequestScalarWhereInput[]
    id?: StringFilter<"ServiceRequest"> | string
    userId?: StringFilter<"ServiceRequest"> | string
    serviceId?: StringFilter<"ServiceRequest"> | string
    details?: StringFilter<"ServiceRequest"> | string
    status?: StringFilter<"ServiceRequest"> | string
    createdAt?: DateTimeFilter<"ServiceRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceRequest"> | Date | string
  }

  export type BusinessRegistrationUpsertWithWhereUniqueWithoutUserInput = {
    where: BusinessRegistrationWhereUniqueInput
    update: XOR<BusinessRegistrationUpdateWithoutUserInput, BusinessRegistrationUncheckedUpdateWithoutUserInput>
    create: XOR<BusinessRegistrationCreateWithoutUserInput, BusinessRegistrationUncheckedCreateWithoutUserInput>
  }

  export type BusinessRegistrationUpdateWithWhereUniqueWithoutUserInput = {
    where: BusinessRegistrationWhereUniqueInput
    data: XOR<BusinessRegistrationUpdateWithoutUserInput, BusinessRegistrationUncheckedUpdateWithoutUserInput>
  }

  export type BusinessRegistrationUpdateManyWithWhereWithoutUserInput = {
    where: BusinessRegistrationScalarWhereInput
    data: XOR<BusinessRegistrationUpdateManyMutationInput, BusinessRegistrationUncheckedUpdateManyWithoutUserInput>
  }

  export type BusinessRegistrationScalarWhereInput = {
    AND?: BusinessRegistrationScalarWhereInput | BusinessRegistrationScalarWhereInput[]
    OR?: BusinessRegistrationScalarWhereInput[]
    NOT?: BusinessRegistrationScalarWhereInput | BusinessRegistrationScalarWhereInput[]
    id?: StringFilter<"BusinessRegistration"> | string
    userId?: StringFilter<"BusinessRegistration"> | string
    businessName?: StringFilter<"BusinessRegistration"> | string
    businessType?: StringFilter<"BusinessRegistration"> | string
    status?: StringFilter<"BusinessRegistration"> | string
    createdAt?: DateTimeFilter<"BusinessRegistration"> | Date | string
    updatedAt?: DateTimeFilter<"BusinessRegistration"> | Date | string
  }

  export type ServiceRequestCreateWithoutServiceInput = {
    id?: string
    details: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutServiceRequestsInput
  }

  export type ServiceRequestUncheckedCreateWithoutServiceInput = {
    id?: string
    userId: string
    details: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceRequestCreateOrConnectWithoutServiceInput = {
    where: ServiceRequestWhereUniqueInput
    create: XOR<ServiceRequestCreateWithoutServiceInput, ServiceRequestUncheckedCreateWithoutServiceInput>
  }

  export type ServiceRequestCreateManyServiceInputEnvelope = {
    data: ServiceRequestCreateManyServiceInput | ServiceRequestCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type ServiceRequestUpsertWithWhereUniqueWithoutServiceInput = {
    where: ServiceRequestWhereUniqueInput
    update: XOR<ServiceRequestUpdateWithoutServiceInput, ServiceRequestUncheckedUpdateWithoutServiceInput>
    create: XOR<ServiceRequestCreateWithoutServiceInput, ServiceRequestUncheckedCreateWithoutServiceInput>
  }

  export type ServiceRequestUpdateWithWhereUniqueWithoutServiceInput = {
    where: ServiceRequestWhereUniqueInput
    data: XOR<ServiceRequestUpdateWithoutServiceInput, ServiceRequestUncheckedUpdateWithoutServiceInput>
  }

  export type ServiceRequestUpdateManyWithWhereWithoutServiceInput = {
    where: ServiceRequestScalarWhereInput
    data: XOR<ServiceRequestUpdateManyMutationInput, ServiceRequestUncheckedUpdateManyWithoutServiceInput>
  }

  export type UserCreateWithoutServiceRequestsInput = {
    id?: string
    email: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    businessRegistrations?: BusinessRegistrationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutServiceRequestsInput = {
    id?: string
    email: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    businessRegistrations?: BusinessRegistrationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutServiceRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutServiceRequestsInput, UserUncheckedCreateWithoutServiceRequestsInput>
  }

  export type ServiceCreateWithoutServiceRequestsInput = {
    id?: string
    name: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUncheckedCreateWithoutServiceRequestsInput = {
    id?: string
    name: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateOrConnectWithoutServiceRequestsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutServiceRequestsInput, ServiceUncheckedCreateWithoutServiceRequestsInput>
  }

  export type UserUpsertWithoutServiceRequestsInput = {
    update: XOR<UserUpdateWithoutServiceRequestsInput, UserUncheckedUpdateWithoutServiceRequestsInput>
    create: XOR<UserCreateWithoutServiceRequestsInput, UserUncheckedCreateWithoutServiceRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutServiceRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutServiceRequestsInput, UserUncheckedUpdateWithoutServiceRequestsInput>
  }

  export type UserUpdateWithoutServiceRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessRegistrations?: BusinessRegistrationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutServiceRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessRegistrations?: BusinessRegistrationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ServiceUpsertWithoutServiceRequestsInput = {
    update: XOR<ServiceUpdateWithoutServiceRequestsInput, ServiceUncheckedUpdateWithoutServiceRequestsInput>
    create: XOR<ServiceCreateWithoutServiceRequestsInput, ServiceUncheckedCreateWithoutServiceRequestsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutServiceRequestsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutServiceRequestsInput, ServiceUncheckedUpdateWithoutServiceRequestsInput>
  }

  export type ServiceUpdateWithoutServiceRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateWithoutServiceRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutBusinessRegistrationsInput = {
    id?: string
    email: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceRequests?: ServiceRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBusinessRegistrationsInput = {
    id?: string
    email: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceRequests?: ServiceRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBusinessRegistrationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBusinessRegistrationsInput, UserUncheckedCreateWithoutBusinessRegistrationsInput>
  }

  export type UserUpsertWithoutBusinessRegistrationsInput = {
    update: XOR<UserUpdateWithoutBusinessRegistrationsInput, UserUncheckedUpdateWithoutBusinessRegistrationsInput>
    create: XOR<UserCreateWithoutBusinessRegistrationsInput, UserUncheckedCreateWithoutBusinessRegistrationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBusinessRegistrationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBusinessRegistrationsInput, UserUncheckedUpdateWithoutBusinessRegistrationsInput>
  }

  export type UserUpdateWithoutBusinessRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceRequests?: ServiceRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBusinessRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceRequests?: ServiceRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ServiceRequestCreateManyUserInput = {
    id?: string
    serviceId: string
    details: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusinessRegistrationCreateManyUserInput = {
    id?: string
    businessName: string
    businessType: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceRequestUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutServiceRequestsNestedInput
  }

  export type ServiceRequestUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRequestUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessRegistrationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessRegistrationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessRegistrationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRequestCreateManyServiceInput = {
    id?: string
    userId: string
    details: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceRequestUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutServiceRequestsNestedInput
  }

  export type ServiceRequestUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRequestUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}