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
    [Route("api/pharaohs")]
    [ApiController]
    public class PharaohsController : ControllerBase
    {
        private readonly EgyptianDBContext _context;

        public PharaohsController(EgyptianDBContext context)
        {
            _context = context;
        }

        // GET: api/pharaohs/all
        /// <summary>
        /// Вывод всех фараонов
        /// </summary>
        [HttpGet("all"), Tags("Фараоны")]
        public async Task<ActionResult<Pharaoh>> GetPharaoh()
        {
            return Ok(await _context.Pharaohs.ToListAsync());
        }
        // GET: api/pharaohs/find/Cleopatra
        /// <summary>
        /// Поиск фараона по имени
        /// </summary>
        [HttpGet("find/{name}"), Tags("Фараоны")]
        public async Task<ActionResult<Pharaoh>> GetPharaoh(string name)
        {
            var Pharaoh = await _context.Pharaohs.FindAsync(name);
            if (Pharaoh == null)
                return BadRequest($"Pharaoh {name} was not found");
            return Ok(Pharaoh);
        }

        // POST: api/pharaohs/add
        /// <summary>
        /// Добавление фараона
        /// </summary>
        [HttpPost("add"), Tags("Фараоны")]
        public async Task<ActionResult<Pharaoh>> AddPharaoh(Pharaoh Pharaoh)
        {
            await _context.Pharaohs.AddAsync(Pharaoh);
            await _context.SaveChangesAsync();
            return Ok(await _context.Pharaohs.ToArrayAsync());
        }

        // PUT: api/pharaohs/update/Cleopatra
        /// <summary>
        /// Обновление информации о фараоне
        /// </summary>
        [HttpPut("update"), Tags("Фараоны")]
        public async Task<ActionResult<Pharaoh>> UpdatePharaoh(Pharaoh request)
        {
            var dbPharaoh = await _context.Pharaohs.FindAsync(request.Name);
            if (dbPharaoh == null)
                return BadRequest($"Pharaoh {request.Name} was not found");
            dbPharaoh.BirthDescription = request.BirthDescription;
            dbPharaoh.BirthName = request.BirthName;
            dbPharaoh.ThroneName = request.ThroneName;
            dbPharaoh.Name = request.Name;
            dbPharaoh.Dynasty = request.Dynasty;
            dbPharaoh.NebtyDescription = request.NebtyDescription;
            await _context.SaveChangesAsync();
            return Ok(await _context.Pharaohs.ToArrayAsync());
        }

        // DELETE: api/pharaohs/delete/Cleopatra
        /// <summary>
        /// Удаление фараона
        /// </summary>
        [HttpDelete("delete/{name}"), Tags("Фараоны")]
        public async Task<ActionResult<Pharaoh>> DeletePharaoh(string name)
        {
            var Pharaoh = await _context.Pharaohs.FindAsync(name);
            if (Pharaoh == null)
                return BadRequest($"Pharaoh {name} was not found");
            _context.Pharaohs.Remove(Pharaoh);
            await _context.SaveChangesAsync();
            return Ok(await _context.Pharaohs.ToArrayAsync());
        }
        private bool PharaohExists(string name)
        {
            return _context.Pharaohs.Any(e => e.Name == name);
        }
    }
}
