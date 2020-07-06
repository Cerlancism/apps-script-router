namespace AppsScriptRouter
{
    export class Handler
    {
        constructor(
            private readonly routingRoot: Routable
        ) { }

        handleGet(request: RequestGetBase<any>): WebAppOutput
        {
            return this.handle(request, router => router.get)
        }

        handlePost(request: RequestPostBase<any>): WebAppOutput
        {
            return this.handle(request, router => router.post)
        }

        private handle(request: RequestGetBase<any> | RequestPostBase<any>, selector: (router: Router<any, any>) => Function | undefined): WebAppOutput
        {
            const router = this.traversePath(request.pathInfo ?? "")

            if (router)
            {
                const selected = selector(router)
                if (selected)
                {
                    try
                    {
                        return selected(request)
                    }
                    catch (error)
                    {
                        return Helpers.returnError(error, request)
                    }

                }
            }
            return Helpers.returnEmpty(request)
        }

        private traversePath(path: string): Router<any, any> | undefined
        {
            if (path === "")
            {
                return this.routingRoot as Router<any, any> | undefined
            }

            const paths = path.split("/")
            const controllers = this.routingRoot

            let routers = controllers

            while (paths.length > 0)
            {
                const current = paths.shift() as string
                const keys = Object.keys(routers)
                const target = keys.find(x => x === current)

                if (!target)
                {
                    break
                }

                routers = routers[target] as Routable
            }
            return routers as Router<any, any> | undefined
        }
    }
}