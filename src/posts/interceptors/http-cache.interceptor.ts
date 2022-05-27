import {CACHE_KEY_METADATA, CacheInterceptor, ExecutionContext, Injectable} from '@nestjs/common';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
    trackBy(context: ExecutionContext): string | undefined {
        const cacheKey = this.reflector.get(
            CACHE_KEY_METADATA,
            context.getHandler(),
        );

        // if we don't use @CacheKey() then use original super.trackBy(context)
        if (cacheKey) {
            const request = context.switchToHttp().getRequest();
            return `${cacheKey}-${request._parsedUrl.query}`;
        }

        return super.trackBy(context);
    }
}