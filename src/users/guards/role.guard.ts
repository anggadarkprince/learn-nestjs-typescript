import Role from '../enums/role.enum';
import {CanActivate, ExecutionContext, mixin, Type} from '@nestjs/common';
import RequestWithUser from '../../authentication/interfaces/request-with-user.interface';
import JwtAuthenticationGuard from "../../authentication/guards/jwt-authentication.guard";

const RoleGuard = (role: Role): Type<CanActivate> => {
    class RoleGuardMixin extends JwtAuthenticationGuard {
        async canActivate(context: ExecutionContext) {
            await super.canActivate(context);

            const request = context.switchToHttp().getRequest<RequestWithUser>();
            const user = request.user;

            return user?.roles.includes(role);
        }
    }

    return mixin(RoleGuardMixin);
}

export default RoleGuard;