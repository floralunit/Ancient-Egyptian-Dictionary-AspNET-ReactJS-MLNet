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
    [Route("api/")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly EgyptianDBContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CommentsController(EgyptianDBContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        // GET: api/questions/all
        /// <summary>
        /// Вывод всех обсуждений
        /// </summary>
        [HttpGet("questions/all"), Authorize, Tags("Обсуждения")]
        public async Task<ActionResult<Question>> GetQuestions()
        {
            return Ok(await _context.Questions.ToListAsync());
        }
        // GET: api/comments/all
        /// <summary>
        /// Вывод всех комментариев
        /// </summary>
        [HttpGet("comments/all"), Authorize, Tags("Обсуждения")]
        public async Task<ActionResult<Comment>> GetComments()
        {
            return Ok(await _context.Comments.ToListAsync());
        }
        // GET: api/comments/3
        /// <summary>
        /// Вывод всех комментариев конкретного обсуждения по id
        /// </summary>
        [HttpGet("comments/{id}"), Authorize, Tags("Обсуждения")]
        public async Task<ActionResult<Comment>> GetCommentsById(int id)
        {
            var comments = await _context.Comments.Where(x => x.QuestionId == id).ToListAsync();
            if (comments.Count() > 0)
                return Ok(comments);
            else 
                return BadRequest($"No comments for question №{id} were found");
        }

        // POST: api/questions/add
        /// <summary>
        /// Создание обсуждения
        /// </summary>
        [HttpPost("questions/add"), Authorize, Tags("Обсуждения")]
        public async Task<ActionResult<Question>> AddQuestion(Question question)
        {
            question.DtCreated = DateTime.Now;
            await _context.Questions.AddAsync(question);
            await _context.SaveChangesAsync();
            return Ok(await _context.Questions.ToArrayAsync());
        }
        // POST: api/comments/3/add
        /// <summary>
        /// Создание комментария в каком-то обсуждении по id
        /// </summary>
        [HttpPost("comments/add/{id}"), Authorize, Tags("Обсуждения")]
        public async Task<ActionResult<Question>> AddComment(Comment comment, int id)
        {
            comment.QuestionId = id;
            comment.CreatedDt = DateTime.Now;
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
            return Ok(await _context.Comments.Where(x => x.QuestionId == id).ToArrayAsync());
        }
        // POST: api/comments/3/count
        /// <summary>
        /// Подсчет количества комментариев в обсуждении по Id
        /// </summary>
        [HttpPost("comments/count/{id}"), Authorize, Tags("Обсуждения")]
        public async Task<ActionResult<Question>> CommentsQuestionCount(int id)
        {
            var comments = await _context.Comments.Where(x => x.QuestionId == id).ToListAsync();
            return Ok(comments.Count());
        }
        // POST: api/comments/user/3/count
        /// <summary>
        /// Подсчет количества комментариев пользователя по Id
        /// </summary>
        [HttpPost("comments/count/user/{id}"), Authorize, Tags("Обсуждения")]
        public async Task<ActionResult<Question>> CommentsUserCount(int id)
        {
            var comments = await _context.Comments.Where(x => x.UserId == id).ToListAsync();
            return Ok(comments.Count());
        }

        // DELETE: api/questions/delete/3
        /// <summary>
        /// Удаление обсуждения
        /// </summary>
        [HttpDelete("questions/delete/{id}"), Authorize, Tags("Обсуждения")]
        public async Task<ActionResult<God>> DeleteQuestion(int id)
        {
            var Question = await _context.Questions.FirstOrDefaultAsync(g => g.Id == id);
            if (Question == null)
                return BadRequest($"Question №{id} was not found");
            else
            {
                _context.Questions.Remove(Question);
                foreach (var comment in _context.Comments)
                {
                    if (comment.QuestionId == id)
                        _context.Comments.Remove(comment);
                }
                await _context.SaveChangesAsync();
                return Ok(await _context.Questions.ToArrayAsync());
            }
        }
        // DELETE: api/comments/delete/3
        /// <summary>
        /// Удаление комментария
        /// </summary>
        [HttpDelete("comments/delete/{id}"), Authorize, Tags("Обсуждения")]
        public async Task<ActionResult<God>> DeleteComment( int id)
        {
            var Comment = await _context.Comments.FirstOrDefaultAsync(g => g.Id == id);
            if (Comment == null)
                return BadRequest($"Comment №{id} was not found");
            else
            {
                _context.Comments.Remove(Comment);
                await _context.SaveChangesAsync();
                return Ok(await _context.Comments.ToArrayAsync());
            }
        }
    }
}
