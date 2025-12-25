
import { JwtPayload } from "./token";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}