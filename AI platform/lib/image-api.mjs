// Local prototype adapter. No photo is sent to an external service.
// Replace this handler with your server-side image provider integration later.
export async function handleImageRequest(request) {
 const headers={'Cache-Control':'no-store'};
 if(new URL(request.url).pathname==='/api/image-config')return Response.json({ready:false,mode:'local',provider:null},{headers});
 if(request.method!=='POST')return Response.json({error:'Method not allowed.'},{status:405,headers});
 return Response.json({code:'AI_NOT_CONFIGURED',error:'Live AI editing is not connected in this local version. Try the sample room, or load an edited test image to preview the complete approval flow.'},{status:503,headers});
}
