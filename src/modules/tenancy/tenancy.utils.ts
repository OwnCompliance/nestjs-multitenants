import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import * as tenantsOrmconfig from '../../tenants-orm.config';

export function getTenantConnection(tenantId: string): Promise<Connection> {
  const connectionName = `tenant_${tenantId}`;
  const connectionManager = getConnectionManager();

  if (connectionManager.has(connectionName)) {
    const connection = connectionManager.get(connectionName);
    return Promise.resolve(connection.isConnected ? connection : connection.connect());
  }

  return createConnection({
    ...(tenantsOrmconfig as MysqlConnectionOptions),
    name: connectionName,
    database: connectionName,
  });
}
