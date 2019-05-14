using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QLHocVien.Models;

namespace QLHocVien.Models
{
    public class QLHocVienContext: DbContext
    {
        public QLHocVienContext(DbContextOptions<QLHocVienContext> options)
            :base(options)
        {

        }
        public DbSet<Catalog> Catalogs { get; set; }
        public DbSet<CandidateType> CandidateTypes { get; set; }
        public DbSet<Country> Countrys { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Major> Majors { get; set; }
        public DbSet<ExamSubject> ExamSubjects { get; set; }
        public DbSet<ScoreExam> ScoreExams { get; set; }
        public DbSet<Year> Years { get; set; }
        public DbSet<Semester> Semesters { get; set; }
        public DbSet<Stage> Stages { get; set; }
        public DbSet<Intake> Intakes { get; set; }
        public DbSet<Parameter> Parameters { get; set; }
        public DbSet<CandidateDocument> CandidateDocuments { get; set; }
        public DbSet<StageDetail> StageDetails { get; set; }
        public DbSet<Candidate> Candidate { get; set; }
        public DbSet<QLHocVien.Models.User> Users { get; set; }
        public DbSet<QLHocVien.Models.Status> Status { get; set; }
        public DbSet<QLHocVien.Models.InputType> InputType { get; set; }
    }
}
