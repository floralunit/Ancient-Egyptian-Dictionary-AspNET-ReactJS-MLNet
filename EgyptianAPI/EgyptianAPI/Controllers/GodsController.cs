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
    [Route("api/gods")]
    [ApiController]
    public class GodsController : ControllerBase
    {
        private readonly EgyptianDBContext _context;
        public GodsController(EgyptianDBContext context)
        {
            _context = context;
        }
        // GET: api/gods/all
        /// <summary>
        /// Вывод всех богов
        /// </summary>
        [HttpGet("all"), Tags("Божества")]
        public async Task<ActionResult<God>> GetGod()
        {
            return Ok(await _context.Gods.ToListAsync());
        }
        // GET: api/gods/find/Анубис
        /// <summary>
        /// Поиск бога по имени
        /// </summary>
        [HttpGet("find/{name}"), Tags("Божества")]
        public async Task<ActionResult<God>> GetGod(string name)
        {
            var God = await _context.Gods.FirstOrDefaultAsync(g => g.Name.Contains(name));
            if (God == null)
                return BadRequest($"God {name} was not found");
            return Ok(God);
        }

        // POST: api/gods/add
        /// <summary>
        /// Добавление бога
        /// </summary>
        [HttpPost("add"), Authorize(Roles = "Admin"), Tags("Божества")]
        public async Task<ActionResult<God>> AddGod(God God)
        {
            await _context.Gods.AddAsync(God);
            await _context.SaveChangesAsync();
            return Ok(await _context.Gods.ToArrayAsync());
        }

        // PUT: api/gods/update/Анубис
        /// <summary>
        /// Обновление информации о боге
        /// </summary>
        [HttpPut("update"), Authorize(Roles = "Admin"), Tags("Божества")]
        public async Task<ActionResult<God>> UpdateGod(God request)
        {
            var dbGod = await _context.Gods.FirstOrDefaultAsync(g => g.Name.Contains(request.Name));
            if (dbGod == null)
                return BadRequest($"God {request.Name} was not found");
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

        // DELETE: api/gods/delete/Анубис
        /// <summary>
        /// Удаление бога
        /// </summary>
        [HttpDelete("delete/{name}"), Authorize(Roles = "Admin"), Tags("Божества")]
        public async Task<ActionResult<God>> DeleteGod(string name)
        {
            var God = await _context.Gods.FirstOrDefaultAsync(g => g.Name.Contains(name));
            if (God == null)
                return BadRequest($"God {name} was not found");
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
