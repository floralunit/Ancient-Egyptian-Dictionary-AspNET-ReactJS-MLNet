using System;
using System.Collections.Generic;

namespace EgyptianAPI.Models
{
    public partial class AbydosCanon
    {
        public string Id { get; set; }
        public string? NameInList { get; set; }
        public string? Transliteration { get; set; }
        public string? PharaohName { get; set; }
        public string? WikiLink { get; set; }
        public string? EnglishPharaohName { get; set; }
        public string? PharaohSeLink { get; set; }
        public string? Dynasty { get; set; }
    }
}
