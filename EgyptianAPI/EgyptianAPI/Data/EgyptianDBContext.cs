using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace EgyptianAPI.Data
{
    public partial class EgyptianDBContext : DbContext
    {
        public EgyptianDBContext()
        {
        }

        public EgyptianDBContext(DbContextOptions<EgyptianDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AbydosCanon> AbydosCanons { get; set; } = null!;
        public virtual DbSet<Categorium> Categoria { get; set; } = null!;
        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<Glyph> Glyphs { get; set; } = null!;
        public virtual DbSet<God> Gods { get; set; } = null!;
        public virtual DbSet<Phonogram> Phonograms { get; set; } = null!;
        public virtual DbSet<Question> Questions { get; set; } = null!;
        public virtual DbSet<SaqqaraCanon> SaqqaraCanons { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=wpl37.hosting.reg.ru;Database=u1667294_EgyptianDB;User Id=u1667294_u1667294;Password=51ApEpAv;Trusted_Connection=False;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("u1667294_u1667294");

            modelBuilder.Entity<AbydosCanon>(entity =>
            {
                entity.ToTable("AbydosCanon", "dbo");

                entity.Property(e => e.Id)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Dynasty)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.EnglishPharaohName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NameInList).HasMaxLength(255);

                entity.Property(e => e.PharaohName).HasMaxLength(255);

                entity.Property(e => e.Transliteration).HasMaxLength(255);
            });

            modelBuilder.Entity<Categorium>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Categoria", "dbo");

                entity.Property(e => e.Categoria)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Comment", "dbo");

                entity.Property(e => e.CreatedDt).HasColumnType("datetime");

                entity.Property(e => e.Username).HasMaxLength(100);
            });

            modelBuilder.Entity<Glyph>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Glyph", "dbo");

                entity.Property(e => e.Categoria)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.GardinerCode)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.GlyphUnicode).HasMaxLength(10);

                entity.Property(e => e.Notes).HasMaxLength(500);

                entity.Property(e => e.Phonogram).HasMaxLength(255);

                entity.Property(e => e.Transliteration).HasMaxLength(255);

                entity.Property(e => e.UnicodeString).HasMaxLength(25);
            });

            modelBuilder.Entity<God>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("God", "dbo");

                entity.Property(e => e.GardinerCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Hieroglyphic).HasMaxLength(50);

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Transliteration).HasMaxLength(50);

                entity.Property(e => e.Type).HasMaxLength(255);
            });

            modelBuilder.Entity<Phonogram>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Phonogram", "dbo");

                entity.Property(e => e.GardinerCode)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Glyph).HasMaxLength(10);

                entity.Property(e => e.ManuelCotage)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Transliteration).HasMaxLength(25);

                entity.Property(e => e.Type)
                    .HasMaxLength(25)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Question", "dbo");

                entity.Property(e => e.DtCreated).HasColumnType("datetime");

                entity.Property(e => e.Subject).HasMaxLength(100);

                entity.Property(e => e.Username).HasMaxLength(100);
            });

            modelBuilder.Entity<SaqqaraCanon>(entity =>
            {
                entity.ToTable("SaqqaraCanon", "dbo");

                entity.Property(e => e.Id)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.EnglishPharaohName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NameInList).HasMaxLength(255);

                entity.Property(e => e.PharaohName).HasMaxLength(255);

                entity.Property(e => e.Transliteration).HasMaxLength(255);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("User", "dbo");

                entity.Property(e => e.PasswordHash).HasMaxLength(255);

                entity.Property(e => e.PasswordSalt).HasMaxLength(255);

                entity.Property(e => e.RefreshToken).IsUnicode(false);

                entity.Property(e => e.Role).HasMaxLength(50);

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
