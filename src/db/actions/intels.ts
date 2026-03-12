import { db } from '../index';
import { intels } from '../schema';
import { eq, desc } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';
import { type Intel } from './types';

/** 获取特定服务的社区线报 */
export const getIntelsByServiceId = createServerFn({ method: "GET" })
  .inputValidator((serviceId: string) => serviceId)
  .handler(async ({ data: serviceId }: { data: string }): Promise<Intel[]> => {
    return db
      .select()
      .from(intels)
      .where(eq(intels.serviceId, serviceId))
      .orderBy(desc(intels.createdAt));
  });

/** 发布新线报 */
export const createIntel = createServerFn({ method: "POST" })
  .inputValidator((data: { serviceId: string, username: string, content: string }) => data)
  .handler(async ({ data }) => {
    const { serviceId, username, content } = data;
    
    return db.insert(intels)
      .values({
        serviceId,
        username,
        content,
      })
      .returning();
  });
