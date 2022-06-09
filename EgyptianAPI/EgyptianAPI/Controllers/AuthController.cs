using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.Security.Claims;

namespace AuthenticationWebApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly EgyptianDBContext _context;
        private readonly IAuthService _authService;

        public AuthController(EgyptianDBContext context, IAuthService authService, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _authService = authService;
        }

        /// <summary>
        /// Регистрация
        /// </summary>
        [HttpPost("signup"), Tags("Авторизация")]
        public async Task<ActionResult<User>> RegisterUser(UserDto request)
        {
            var response = await _authService.RegisterUser(request);
            return Ok(response);
        }

        /// <summary>
        /// Авторизация
        /// </summary>
        [HttpPost("signin"), Tags("Авторизация")]
        public async Task<ActionResult<User>> Login(UserDto request)
        {
            var response = await _authService.Login(request);
            if(response.Success)
                return Ok(response);

            return BadRequest(response.Message);
        }

        /// <summary>
        /// Обновление токена
        /// </summary>
        [HttpPost("refresh-token"), Tags("Авторизация")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var response = await _authService.RefreshToken();
            if (response.Success)
                return Ok(response);

            return BadRequest(response.Message);
        }


        /// <summary>
        /// Поиск пользователя по нику
        /// </summary>
        [HttpGet("profile"), Tags("Авторизация")]
        public async Task<ActionResult<string>> GetUserInfo(string username)
        {
            var User = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);
            if (User == null)
                return BadRequest($"User {username} was not found");
            return Ok(User);
        }

        /// <summary>
        /// Проверка на авторизацию под админом
        /// </summary>
        [HttpGet("check-auth"), Authorize(Roles = "Admin"), Tags("Авторизация")]
        public ActionResult<string> Aloha()
        {
            return Ok("Aloha! You're authorized!");
        }
    }
}
