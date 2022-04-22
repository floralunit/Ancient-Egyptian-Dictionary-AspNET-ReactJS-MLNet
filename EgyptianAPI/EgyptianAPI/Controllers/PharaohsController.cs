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

        // GET: pharaohs
        [HttpGet("all")]
        public async Task<ActionResult<Pharaoh>> GetPharaoh()
        {
            return Ok(await _context.Pharaohs.ToListAsync());
        }
        // GET: pharaohs/find/Cleopatra
        [HttpGet("find/{Name}")]
        public async Task<ActionResult<Pharaoh>> GetPharaoh(string name)
        {
            var Pharaoh = await _context.Pharaohs.FindAsync(name);
            if (Pharaoh == null)
                return BadRequest("Pharaoh was not found");
            return Ok(Pharaoh);
        }

        // POST: pharaohs/add

        [HttpPost("add")]
        public async Task<ActionResult<Pharaoh>> AddPharaoh(Pharaoh Pharaoh)
        {
            await _context.Pharaohs.AddAsync(Pharaoh);
            await _context.SaveChangesAsync();
            return Ok(await _context.Pharaohs.ToArrayAsync());
        }

        // PUT: pharaohs/update/Cleopatra
        [HttpPut("update")]
        public async Task<ActionResult<Pharaoh>> UpdatePharaoh(Pharaoh request)
        {
            var dbPharaoh = await _context.Pharaohs.FindAsync(request.Name);
            if (dbPharaoh == null)
                return BadRequest("Pharaoh was not found");
            dbPharaoh.BirthDescription = request.BirthDescription;
            dbPharaoh.BirthName = request.BirthName;
            dbPharaoh.ThroneName = request.ThroneName;
            dbPharaoh.Name = request.Name;
            dbPharaoh.Dynasty = request.Dynasty;
            dbPharaoh.NebtyDescription = request.NebtyDescription;
            await _context.SaveChangesAsync();
            return Ok(await _context.Pharaohs.ToArrayAsync());
        }

        // DELETE: pharaohs/delete/Cleopatra
        [HttpDelete("delete/{Name}")]
        public async Task<ActionResult<Pharaoh>> DeletePharaoh(string name)
        {
            var Pharaoh = await _context.Pharaohs.FindAsync(name);
            if (Pharaoh == null)
                return BadRequest("Pharaoh was not found");
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
