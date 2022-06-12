using System;
using System.Collections.Generic;

namespace EgyptianAPI.Models
{
    public partial class Phonogram
    {
        public int Id { get; set; }
        public string? Glyph { get; set; }
        public string? GardinerCode { get; set; }
        public string? Transliteration { get; set; }
        public string? ManuelCotage { get; set; }
        public string? Type { get; set; }
    }
}
