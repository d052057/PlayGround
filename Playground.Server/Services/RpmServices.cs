using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;
using PlayGround.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
namespace PlayGround.Server.Services
{
    public interface IRpmServices
    {
        Task<IEnumerable<RpmTrack>> GetRpmTracks(string folder);
        Task<MediaDirectory> GetFilesByFolder(string folder, string menu);
    }
    public class RpmServices : IRpmServices
    {
        private readonly WebDbContext _context;
        public RpmServices(WebDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<RpmTrack>> GetRpmTracks(string folder)
        {

            Guid RpmRecordId = GetRpmRecordId(folder);
            IEnumerable<RpmTrack> track = await _context.RpmTracks
                .Where(s => s.RpmId == RpmRecordId)
                .OrderBy(s => s.Title)
                .ToListAsync();
            return track;

        }
        private Guid GetRpmRecordId(string folder)
        {
            if (_context.Rpms.Any(x => x.Title == (folder + @".jpg")))
            {
                var RpmRecord = _context.Rpms.Single(x => x.Title == (folder + @".jpg"));
                return RpmRecord.RecordId;
            }
            return Guid.Empty;
        }

        public async Task<MediaDirectory> GetFilesByFolder(string folder, string menu)
        {
            MediaDirectory Record = new();
            MediaMenu MenuRecord = new();
            try
            {
                MenuRecord = await _context.MediaMenus.SingleAsync(i => i.Menu == menu);
                if (MenuRecord is not null)
                {

                    Record = await _context.MediaDirectories
                    .Where(m => (m.Directory == folder && m.MenuId == MenuRecord.RecordId))
                        .Include(p => p.MediaMetaData.OrderBy(o => o.Title))
                        .FirstAsync();
                }
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message);
            }
            return Record;
        }
    }
}
