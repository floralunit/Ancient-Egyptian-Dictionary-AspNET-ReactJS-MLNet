using System;
using System.Collections.Generic;

namespace EgyptianAPI.Models
{
    public partial class Glyph
    {
        public string? GlyphUnicode { get; set; }
        public string? UnicodeString { get; set; }
        public string Categoria { get; set; } = null!;
        public string GardinerCode { get; set; } = null!;
        public string? Description { get; set; }
        public string? Phonogram { get; set; }
        public string? Transliteration { get; set; }
        public string? Notes { get; set; }
    }
}
