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
        // GET: api/categoriums/all
        /// <summary>
        /// Вывод всех категорий
        /// </summary>
        [HttpGet("all"), Tags("Категории")]
        public async Task<ActionResult<Categorium>> GetCategoria()
        {
            return Ok(await _context.Categoria.ToListAsync());
        }
        // GET: api/categoriums/find/A
        /// <summary>
        /// Поиск категории по названию
        /// </summary>
        [HttpGet("find/{categoria}"), Tags("Категории")]
        public async Task<ActionResult<Categorium>> GetCategoria(string categoria)
        {
            var Categoria = await _context.Categoria.FindAsync(categoria);
            if (Categoria == null)
                return BadRequest($"Categoria {categoria} was not found");
            return Ok(Categoria);
        }

        // POST: api/categoriums/add
        /// <summary>
        /// Добавить категорию
        /// </summary>
        [HttpPost("add"), Tags("Категории")]
        public async Task<ActionResult<Categorium>> AddCategoria(Categorium categoria)
        {
            await _context.Categoria.AddAsync(categoria);
            await _context.SaveChangesAsync();
            return Ok(await _context.Categoria.ToArrayAsync());
        }

        // PUT: api/categoriums/update/A
        /// <summary>
        /// Обновить информацию о категории
        /// </summary>
        [HttpPut("update"), Tags("Категории")]
        public async Task<ActionResult<Categorium>> UpdateCategoria(Categorium request)
        {
            var dbCategoria = await _context.Categoria.FindAsync(request.Categoria);
            if (dbCategoria == null)
                return BadRequest($"Categoria {request.Categoria} was not found");
            dbCategoria.Amount = request.Amount;
            dbCategoria.Name= request.Name;
            await _context.SaveChangesAsync();
            return Ok(await _context.Categoria.ToArrayAsync());
        }

        // DELETE: api/categoriums/delete/A
        /// <summary>
        /// Удалить категорию
        /// </summary>
        [HttpDelete("delete/{categoria}"), Tags("Категории")]
        public async Task<ActionResult<Categorium>> DeleteCategoria (string categoria)
        {
            var Categoria = await _context.Categoria.FindAsync(categoria);
            if (Categoria == null)
                return BadRequest($"Categoria {categoria} was not found");
            _context.Categoria.Remove(Categoria);
            await _context.SaveChangesAsync();
            return Ok(await _context.Categoria.ToArrayAsync());
        }
        private bool CategoriumExists(string categoriaId)
        {
            return _context.Categoria.Any(e => e.Categoria == categoriaId);
        }
    }
}
