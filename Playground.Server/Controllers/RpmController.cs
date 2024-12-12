using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PlayGround.Server.Controllers;
using PlayGround.Server.Models;
using PlayGround.Server.Services;

namespace PlayGround.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RpmController : ControllerBase
    {
        private readonly IRpmServices _rpmservices;
        public RpmController(IRpmServices rpmservices)
        {
            _rpmservices = rpmservices;
        }
        [HttpGet("GetRpmTracks/{folder}")]
        public async Task<IEnumerable<RpmTrack>> GetRpmTracks(string folder)
        {
            return await _rpmservices.GetRpmTracks(folder);

        }
        [HttpGet("GetFilesByFolder")]
        public async Task<ActionResult> GetFilesByFolder(string folder, string menu)
        {
            var xfiles = await _rpmservices.GetFilesByFolder(folder, menu);
            return Ok(xfiles);
        } 
    }
}