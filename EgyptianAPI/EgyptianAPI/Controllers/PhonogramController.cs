using EgyptianAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EgyptianAPI.Controllers
{
    [Route("api/phonograms")]
    [ApiController]
    public class PhonogramController : ControllerBase
    {
        private readonly EgyptianDBContext _context;
        public PhonogramController(EgyptianDBContext context)
        {
            _context = context;
        }
        // GET: api/phonograms/all
        /// <summary>
        /// Вывод всех фонограмм
        /// </summary>
        [HttpGet("all"), Tags("Фонограммы")]
        public async Task<ActionResult<Phonogram>> GetPhonogram()
        {
            return Ok(await _context.Phonograms.ToListAsync());
        }
        ///<summary>
        /// Поиск фонограммы по коду Гардинера
        ///</summary>
        // GET: api/phonograms/find/G14
        [HttpGet("find/{gardinerCode}"), Tags("Фонограммы")]
        public async Task<ActionResult<Phonogram>> GetPhonogram(string gardinerCode)
        {
            var Phonogram = await _context.Phonograms.FirstOrDefaultAsync(g => g.GardinerCode == gardinerCode);
            if (Phonogram == null)
                return BadRequest($"Phonogram {gardinerCode} was not found");
            return Ok(Phonogram);
        }

        // POST: api/phonograms/add
        ///<summary>
        /// Добавление фонограммы
        ///</summary>
        [HttpPost("add"), Authorize(Roles = "Admin"), Tags("Фонограммы")]
        public async Task<ActionResult<Phonogram>> AddPhonogram(Phonogram Phonogram)
        {
            await _context.Phonograms.AddAsync(Phonogram);
            await _context.SaveChangesAsync();
            return Ok(await _context.Phonograms.ToArrayAsync());
        }

        // PUT: api/phonograms/update/5
        ///<summary>
        /// Обновление информации о фонограмме
        ///</summary>
        [HttpPut("update"), Authorize(Roles = "Admin"), Tags("Фонограммы")]
        public async Task<ActionResult<Phonogram>> UpdatePhonogram(Phonogram request)
        {
            var dbPhonogram = await _context.Phonograms.FindAsync(request.GardinerCode);
            if (dbPhonogram == null)
                return BadRequest($"Phonogram {request.GardinerCode} was not found");
            dbPhonogram.Glyph = request.Glyph;
            dbPhonogram.Transliteration = request.Transliteration;
            dbPhonogram.ManuelCotage = request.ManuelCotage;
            dbPhonogram.GardinerCode = request.GardinerCode;
            dbPhonogram.Type = request.Type;
            await _context.SaveChangesAsync();
            return Ok(await _context.Phonograms.ToArrayAsync());
        }

        // DELETE: api/phonograms/delete/5
        ///<summary>
        /// Удаление фонограммы
        ///</summary>

        [HttpDelete("delete/{gardinerCode}"), Authorize(Roles = "Admin"), Tags("Фонограммы")]
        public async Task<ActionResult<Phonogram>> DeletePhonogram(string gardinerCode)
        {
            var Phonogram = await _context.Phonograms.FirstOrDefaultAsync(g => g.GardinerCode == gardinerCode);
            if (Phonogram == null)
                return BadRequest($"Phonogram {gardinerCode} was not found");
            _context.Phonograms.Remove(Phonogram);
            await _context.SaveChangesAsync();
            return Ok(await _context.Phonograms.ToArrayAsync());
        }
        private bool PhonogramExists(int id)
        {
            return _context.Phonograms.Any(e => e.Id == id);
        }
    }
}
