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

        // GET: api/pharaohs/abydoscanon
        /// <summary>
        /// Просмотр абидосского списка
        /// </summary>
        [HttpGet("abydoscanon"), Tags("Фараоны")]
        public async Task<ActionResult<AbydosCanon>> GetAbydoscanon()
        {
            return Ok(await _context.AbydosCanons.ToListAsync());
        }

        // GET: api/pharaohs/saqqaracanon
        /// <summary>
        /// Просмотр саккарского списка
        /// </summary>
        [HttpGet("saqqaracanon"), Tags("Фараоны")]
        public async Task<ActionResult<SaqqaraCanon>> GetPharaoh()
        {
            return Ok(await _context.SaqqaraCanons.ToListAsync());
        }

    }
}
