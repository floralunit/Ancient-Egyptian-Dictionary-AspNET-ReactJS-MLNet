using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationWebApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
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
        /// Проверка на авторизацию под админом
        /// </summary>
        [HttpGet("check-auth"), Authorize(Roles = "Admin"), Tags("Авторизация")]
        public ActionResult<string> Aloha()
        {
            return Ok("Aloha! You're authorized!");
        }
    }
}
