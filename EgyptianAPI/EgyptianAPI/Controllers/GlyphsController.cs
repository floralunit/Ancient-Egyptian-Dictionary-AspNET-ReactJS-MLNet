#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EgyptianAPI.Models;
using Microsoft.AspNetCore.Authorization;

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

        // GET: api/glyphs/all
        /// <summary>
        /// Вывод всех иероглифов
        /// </summary>
        [HttpGet("all"), Tags("Иероглифы")]
        public async Task<ActionResult<Glyph>> GetGlyphs()
        {
            return Ok(await _context.Glyphs.ToListAsync());
        }
        // GET: api/glyphs/all/A
        /// <summary>
        /// Вывод иероглифов по категории
        /// </summary>
        [HttpGet("all/{categoria}"), Tags("Иероглифы")]
        public async Task<ActionResult<Glyph>> GetGlyphsByCategoria(string categoria)
        {
            var glyphs = await _context.Glyphs.Where(g => g.Categoria == categoria).ToListAsync();
            if (glyphs.Count() == 0)
                return BadRequest($"Categoria {categoria} doesn't exist");
            return Ok(glyphs);
        }
        // GET: api/glyphs/find/A15
        /// <summary>
        /// Поиск иероглифа по коду Гардинера
        /// </summary>
        [HttpGet("find/{gardinerCode}"), Tags("Иероглифы")]
        public async Task<ActionResult<Glyph>> GetGlyph(string gardinerCode)
        {
            var Glyph = await _context.Glyphs.FirstOrDefaultAsync(x => x.GardinerCode == gardinerCode);
            if (Glyph == null)
                return BadRequest($"Hieroglyph {gardinerCode} was not found");
            return Ok(Glyph);
        }

        // POST: api/glyphs/add
        /// <summary>
        /// Добавление иероглифа
        /// </summary>
        [HttpPost("add"), Authorize(Roles = "Admin"), Tags("Иероглифы")]
        public async Task<ActionResult<Glyph>> AddGlyph(Glyph Glyph)
        {
            await _context.Glyphs.AddAsync(Glyph);
            await _context.SaveChangesAsync();
            return Ok(await _context.Glyphs.ToArrayAsync());
        }

        // PUT: api/glyphs/update/A15
        /// <summary>
        /// Обновление информации об иероглифе
        /// </summary>
        [HttpPut("update"), Authorize(Roles = "Admin"), Tags("Иероглифы")]
        public async Task<ActionResult<Glyph>> UpdateGlyph(Glyph request)
        {
            var dbGlyph = await _context.Glyphs.FindAsync(request.GardinerCode);
            if (dbGlyph == null)
                return BadRequest($"Hieroglyph {request.GardinerCode} was not found");
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

        // DELETE: api/glyphs/delete/A15
        /// <summary>
        /// Удаление иероглифа
        /// </summary>
        [HttpDelete("delete/{gardinerCode}"), Authorize(Roles = "Admin"), Tags("Иероглифы")]
        public async Task<ActionResult<Glyph>> DeleteGlyphs(string gardinerCode)
        {
            var Glyph = await _context.Glyphs.FindAsync(gardinerCode);
            if (Glyph == null)
                return BadRequest($"Hieroglyph {gardinerCode} was not found");
            _context.Glyphs.Remove(Glyph);
            await _context.SaveChangesAsync();
            return Ok(await _context.Glyphs.ToArrayAsync());
        }
    }
}
