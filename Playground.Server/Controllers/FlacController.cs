using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
namespace PlayGround.Server.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class FlacController : Controller
    {
        [HttpGet]
        //[Route("GetFlac")]
        public Task<IActionResult> GetFlac( string filename)
        {
            var _flacPath = @"/medias/musics/got";
            string fullpathFile = Path.Combine(_flacPath, filename);

            byte[] bytes = (System.IO.File.ReadAllBytes(fullpathFile));
            return Task.FromResult<IActionResult>(File(bytes, "application/octet-stream"));
        }
        
    }
    
}
