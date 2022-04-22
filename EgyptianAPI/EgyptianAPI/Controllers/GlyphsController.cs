#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EgyptianAPI.Models;

namespace EgyptianAPI.Controllers
{
    [Route("api/glyphs")]
    [ApiController]
    public class GlyphsController : ControllerBase
    {
        private readonly EgyptianDBContext _context;

        public GlyphsController(EgyptianDBContext context)
        {
            _context = context;
        }

        // GET: glyphs
        [HttpGet("all")]
        public async Task<ActionResult<Glyph>> GetGlyph()
        {
            return Ok(await _context.Glyphs.ToListAsync());
        }
        // GET: glyphs/find/A15
        [HttpGet("find/{GardinerCode}")]
        public async Task<ActionResult<Glyph>> GetGlyph(string gardinerCode)
        {
            var Glyph = await _context.Glyphs.FindAsync(gardinerCode);
            if (Glyph == null)
                return BadRequest("Hieroglyph was not found");
            return Ok(Glyph);
        }

        // POST: glyphs/add

        [HttpPost("add")]
        public async Task<ActionResult<Glyph>> AddGlyph(Glyph Glyph)
        {
            await _context.Glyphs.AddAsync(Glyph);
            await _context.SaveChangesAsync();
            return Ok(await _context.Glyphs.ToArrayAsync());
        }

        // PUT: glyphs/update/A15
        [HttpPut("update")]
        public async Task<ActionResult<Glyph>> UpdateGlyph(Glyph request)
        {
            var dbGlyph = await _context.Glyphs.FindAsync(request.GardinerCode);
            if (dbGlyph == null)
                return BadRequest("Hieroglyph was not found");
            dbGlyph.Notes= request.Notes;
            dbGlyph.Transliteration= request.Transliteration;
            dbGlyph.Categoria= request.Categoria;
            dbGlyph.Description= request.Description;
             dbGlyph.Phonogram= request.Phonogram;
            dbGlyph.GlyphUnicode= request.GlyphUnicode;
            dbGlyph.GardinerCode= request.GardinerCode;
            dbGlyph.UnicodeString = request.UnicodeString;
            await _context.SaveChangesAsync();
            return Ok(await _context.Glyphs.ToArrayAsync());
        }

        // DELETE: glyphs/delete/A15
        [HttpDelete("delete/{GardinerCode}")]
        public async Task<ActionResult<Glyph>> DeleteGlyphs(string gardinerCode)
        {
            var Glyph = await _context.Glyphs.FindAsync(gardinerCode);
            if (Glyph == null)
                return BadRequest("Hieroglyph was not found");
            _context.Glyphs.Remove(Glyph);
            await _context.SaveChangesAsync();
            return Ok(await _context.Glyphs.ToArrayAsync());
        }
        private bool GlyphExists(string gardinerCode)
        {
            return _context.Glyphs.Any(e => e.GardinerCode == gardinerCode);
        }
    }
}
