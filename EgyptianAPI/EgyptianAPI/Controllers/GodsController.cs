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
    [Route("api/gods")]
    [ApiController]
    public class GodsController : ControllerBase
    {
        private readonly EgyptianDBContext _context;
        public GodsController(EgyptianDBContext context)
        {
            _context = context;
        }
        // GET: gods
        [HttpGet("all")]
        public async Task<ActionResult<God>> GetGod()
        {
            return Ok(await _context.Gods.ToListAsync());
        }
        // GET: gods/find/Анубис
        [HttpGet("find/{Name}")]
        public async Task<ActionResult<God>> GetGod(string name)
        {
            var God = await _context.Gods.FindAsync(name);
            if (God == null)
                return BadRequest("God was not found");
            return Ok(God);
        }

        // POST: gods/add

        [HttpPost("add")]
        public async Task<ActionResult<God>> AddGod(God God)
        {
            await _context.Gods.AddAsync(God);
            await _context.SaveChangesAsync();
            return Ok(await _context.Gods.ToArrayAsync());
        }

        // PUT: gods/update/Анубис
        [HttpPut("update")]
        public async Task<ActionResult<God>> UpdateGod(God request)
        {
            var dbGod = await _context.Gods.FindAsync(request.Name);
            if (dbGod == null)
                return BadRequest("God was not found");
            dbGod.GardinerCode = request.GardinerCode;
            dbGod.Transliteration = request.Transliteration;
            dbGod.Hieroglyphic = request.Hieroglyphic;
            dbGod.Name = request.Name;
            dbGod.Description = request.Description;
            dbGod.Type = request.Type;
            dbGod.View = request.View;
            await _context.SaveChangesAsync();
            return Ok(await _context.Gods.ToArrayAsync());
        }

        // DELETE: gods/delete/Анубис
        [HttpDelete("delete/{Name}")]
        public async Task<ActionResult<God>> DeleteGod(string name)
        {
            var God = await _context.Gods.FindAsync(name);
            if (God == null)
                return BadRequest("God was not found");
            _context.Gods.Remove(God);
            await _context.SaveChangesAsync();
            return Ok(await _context.Gods.ToArrayAsync());
        }
        private bool GodExists(string name)
        {
            return _context.Gods.Any(e => e.Name == name);
        }
    }
}
