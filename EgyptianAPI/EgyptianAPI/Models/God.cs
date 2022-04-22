using System;
using System.Collections.Generic;

namespace EgyptianAPI.Models
{
    public partial class God
    {
        public string Name { get; set; } = null!;
        public string? GardinerCode { get; set; }
        public string? Hieroglyphic { get; set; }
        public string? Transliteration { get; set; }
        public string? Type { get; set; }
        public string? Description { get; set; }
        public string? View { get; set; }
    }
}
