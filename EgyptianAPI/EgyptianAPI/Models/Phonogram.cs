using System;
using System.Collections.Generic;

namespace EgyptianAPI.Models
{
    public partial class Phonogram
    {
        public int Id { get; set; }
        public string Glyph { get; set; } = null!;
        public string GardinerCode { get; set; } = null!;
        public string Transliteration { get; set; } = null!;
        public string? ManuelCotage { get; set; }
        public string? Type { get; set; }
    }
}
