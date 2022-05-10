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
        /// Загрузка картинки и получение прогноза
        /// </summary>
        [HttpPost, Tags("Расшифратор иероглифов")]
        public async Task<IActionResult> GetImage(IFormFile image)
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
