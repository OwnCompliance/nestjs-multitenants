import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getTenantConnection } from '../../tenancy/tenancy.utils';
import { getManager, Repository } from 'typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    let tenant = new Tenant();
    tenant.name = createTenantDto.name;
    tenant.handle = createTenantDto.handle;

    tenant = await this.tenantsRepository.save(tenant);

    const schemaName = `tenant_${tenant.id}`; // This could be moved to be the handle
    await getManager().query(`CREATE DATABASE IF NOT EXISTS ${schemaName}`);

    const connection = await getTenantConnection(`${tenant.id}`);
    await connection.runMigrations()
    await connection.close();

    return tenant 
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantsRepository.find();
  }
}
