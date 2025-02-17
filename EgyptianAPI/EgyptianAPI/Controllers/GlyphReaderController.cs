using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ML;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EgyptianAPI.Controllers
{
    [Route("api/glyphreader")]
    [ApiController]
    public class GlyphReaderController : ControllerBase
    {
        // POST: api/glyphreader
        /// <summary>
        /// РАБОЧАЯ ВЕРСИЯ Загрузка картинки и получение прогноза
        /// </summary>
        [HttpPost, Tags("Расшифратор иероглифов")]
        public async Task<IActionResult> ImportFile([FromForm] IFormFile file,
            [FromServices] PredictionEnginePool<MLModelEgypt.ModelInput, MLModelEgypt.ModelOutput> predictionEnginePool)
        {
            // Проверка на наличие файла
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            // Чтение файла в байты
            byte[] imageBytes;
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                imageBytes = memoryStream.ToArray();
            }

            // Создание входных данных для модели
            var input = new MLModelEgypt.ModelInput()
            {
                ImageSource = imageBytes,
            };

            // Асинхронное предсказание
            var result = await Task.Run(() => predictionEnginePool.Predict(input));

            // Возврат предсказанного значения
            return Ok(result.PredictedLabel);
        }

        // POST: api/glyphreader
        /// <summary>
        /// НЕ РАБОЧАЯ В РЕАКТЕ Загрузка картинки и получение прогноза с возможностью с загрузить файл в сваггере
        /// </summary>
        [HttpPost("loadimage"), Tags("Расшифратор иероглифов")]
        public async Task<IActionResult> LoadImage(IFormFile image,
            [FromServices] PredictionEnginePool<MLModelEgypt.ModelInput, MLModelEgypt.ModelOutput> predictionEnginePool)
        {
            // Проверка длины файла
            long length = image.Length;
            if (length <= 0)
                return BadRequest("Invalid image file.");

            using var fileStream = image.OpenReadStream();
            byte[] imageBytes = new byte[length];

            // Чтение байтов из потока
            await fileStream.ReadAsync(imageBytes, 0, (int)length);

            var input = new MLModelEgypt.ModelInput()
            {
                ImageSource = imageBytes
            };

            // Получаем результат предсказания
            var result = await Task.Run(() => predictionEnginePool.Predict(input));

            // Возвращаем PredictedLabel в ответе
            return Ok(result.PredictedLabel);
        }

    }
}