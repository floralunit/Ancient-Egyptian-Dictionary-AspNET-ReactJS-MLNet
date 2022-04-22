using EgyptianAPI.Models;
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
        // GET: phonograms
        [HttpGet("all")]
        public async Task<ActionResult<Phonogram>> GetPhonogram()
        {
            return Ok(await _context.Phonograms.ToListAsync());
        }
        // GET: phonograms/find/5
        [HttpGet("find/{Id}")]
        public async Task<ActionResult<Phonogram>> GetPhonogram(int id)
        {
            var Phonogram = await _context.Phonograms.FindAsync(id);
            if (Phonogram == null)
                return BadRequest("Phonogram was not found");
            return Ok(Phonogram);
        }

        // POST: phonograms/add

        [HttpPost("add")]
        public async Task<ActionResult<Phonogram>> AddPhonogram(Phonogram Phonogram)
        {
            await _context.Phonograms.AddAsync(Phonogram);
            await _context.SaveChangesAsync();
            return Ok(await _context.Phonograms.ToArrayAsync());
        }

        // PUT: phonograms/update/5
        [HttpPut("update")]
        public async Task<ActionResult<Phonogram>> UpdatePhonogram(Phonogram request)
        {
            var dbPhonogram = await _context.Phonograms.FindAsync(request.Id);
            if (dbPhonogram == null)
                return BadRequest("Phonogram was not found");
            dbPhonogram.Glyph = request.Glyph;
            dbPhonogram.Transliteration = request.Transliteration;
            dbPhonogram.ManuelCotage = request.ManuelCotage;
            dbPhonogram.GardinerCode = request.GardinerCode;
            dbPhonogram.Type = request.Type;
            await _context.SaveChangesAsync();
            return Ok(await _context.Phonograms.ToArrayAsync());
        }

        // DELETE: phonograms/delete/5
        [HttpDelete("delete/{Id}")]
        public async Task<ActionResult<Phonogram>> DeletePhonogram(int id)
        {
            var Phonogram = await _context.Phonograms.FindAsync(id);
            if (Phonogram == null)
                return BadRequest("Phonogram was not found");
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
