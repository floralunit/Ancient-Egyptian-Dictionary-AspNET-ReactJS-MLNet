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
    [Route("api/categoriums")]
    [ApiController]
    public class CategoriumsController : ControllerBase
    {
        private readonly EgyptianDBContext _context;

        public CategoriumsController(EgyptianDBContext context)
        {
            _context = context;
        }
        // GET: categoriums
        [HttpGet("all")]
        public async Task<ActionResult<Categorium>> GetCategoria()
        {
            return Ok(await _context.Categoria.ToListAsync());
        }
        // GET: categoriums/find/A
        [HttpGet("find/{Categoria}")]
        public async Task<ActionResult<Categorium>> GetCategoria(string categoriaId)
        {
            var categoria = await _context.Categoria.FindAsync(categoriaId);
            if (categoria == null)
                return BadRequest("Categoria was not found");
            return Ok(categoria);
        }

        // POST: categoriums/add

        [HttpPost("add")]
        public async Task<ActionResult<Categorium>> AddCategoria(Categorium categoria)
        {
            await _context.Categoria.AddAsync(categoria);
            await _context.SaveChangesAsync();
            return Ok(await _context.Categoria.ToArrayAsync());
        }

        // PUT: categoriums/update/A
        [HttpPut("update")]
        public async Task<ActionResult<Categorium>> UpdateCategoria(Categorium request)
        {
            var dbCategoria = await _context.Categoria.FindAsync(request.Categoria);
            if (dbCategoria == null)
                return BadRequest("Categoria was not found");
            dbCategoria.Amount = request.Amount;
            dbCategoria.Name= request.Name;
            await _context.SaveChangesAsync();
            return Ok(await _context.Categoria.ToArrayAsync());
        }

        // DELETE: categoriums/delete/A
        [HttpDelete("delete/{Categoria}")]
        public async Task<ActionResult<Categorium>> DeleteCategoria (string categoriaId)
        {
            var categoria = await _context.Categoria.FindAsync(categoriaId);
            if (categoria == null)
                return BadRequest("Categoria was not found");
            _context.Categoria.Remove(categoria);
            await _context.SaveChangesAsync();
            return Ok(await _context.Categoria.ToArrayAsync());
        }
        private bool CategoriumExists(string categoriaId)
        {
            return _context.Categoria.Any(e => e.Categoria == categoriaId);
        }
    }
}
