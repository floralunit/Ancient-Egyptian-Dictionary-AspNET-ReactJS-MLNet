using System;
using System.Collections.Generic;

namespace EgyptianAPI.Models
{
    public partial class Question
    {
        public int Id { get; set; }
        public string? Subject { get; set; }
        public string? Description { get; set; }
        public DateTime? DtCreated { get; set; }
        public int? UserId { get; set; }
        public string? Username { get; set; }
    }
}
