import { RouteHandlerMethod } from 'fastify';
import {RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault} from "fastify/types/utils";
import {RouteGenericInterface} from "fastify/types/route";

export type FastifyRequestHandler<RouteGeneric extends RouteGenericInterface = RouteGenericInterface> = RouteHandlerMethod<RawServerDefault, any, RawReplyDefaultExpression, RouteGeneric>;