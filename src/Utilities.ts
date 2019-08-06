// App Script is unable to raise a HTTP error code, any errors will return a error page (default or a preset below) with code 200.
namespace AppsScriptRouter.Helpers
{
    export function returnEmpty(request: any)
    {
        return ContentService.createTextOutput(`error: executed with no returns \n${JSON.stringify(request, undefined, 2)}`).setMimeType(ContentService.MimeType.TEXT)
    }

    export function returnError(error: Error, request: any)
    {
        return ContentService.createTextOutput(`error: ${error.name}\n${error.message}\n${error.stack}\n${JSON.stringify(request, undefined, 2)}`).setMimeType(ContentService.MimeType.TEXT)
    }

    export function returnJSON(data: any)
    {
        return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON)
    }
}