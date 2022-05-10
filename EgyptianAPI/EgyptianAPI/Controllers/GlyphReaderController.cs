using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


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
        public async Task<IActionResult> ImportFile([FromForm] IFormFile file)
        {
            string name = file.FileName;
            string extension = Path.GetExtension(file.FileName);
            //read the file
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
            }
            long length = file.Length;
            if (length < 0)
                return BadRequest();

            using var fileStream = file.OpenReadStream();
            byte[] imageBytes = new byte[length];
            fileStream.Read(imageBytes, 0, (int)file.Length);
            EgyptianMLModel.ModelInput sampleData = new EgyptianMLModel.ModelInput()
            {
                ImageSource = imageBytes,
            };

            //Load model and predict output
            var result = EgyptianMLModel.Predict(sampleData);
            return Ok(result.PredictedLabel);
        }
        // POST: api/glyphreader
        /// <summary>
        /// НЕ РАБОЧАЯ В РЕАКТЕ Загрузка картинки и получение прогноза с возможностью с загрузить файл в сваггере
        /// </summary>
        [HttpPost("loadimage"), Tags("Расшифратор иероглифов")]
        public async Task<IActionResult> LoadImage(IFormFile image)
        {

            //Load sample data
            long length = image.Length;
            if (length < 0)
                return BadRequest();

            using var fileStream = image.OpenReadStream();
            byte[] imageBytes = new byte[length];
            fileStream.Read(imageBytes, 0, (int)image.Length);
            EgyptianMLModel.ModelInput sampleData = new EgyptianMLModel.ModelInput()
            {
                ImageSource = imageBytes,
            };

            //Load model and predict output
            var result = EgyptianMLModel.Predict(sampleData);
            return Ok(result.PredictedLabel);
        }
    }
}