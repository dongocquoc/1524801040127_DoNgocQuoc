using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLHocVien.Models;
using QLHocVien.Models.Response;

namespace QLHocVien.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        private readonly QLHocVienContext _context;

        public CandidatesController(QLHocVienContext context)
        {
            _context = context;
        }

        // GET: api/Candidates
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> GetCandidate()
        {
            var datas = await _context.Candidate.Include(x => x.Major).Include(x => x.Catalog).Include(x => x.Stage).Include(x => x.Country).Include(x => x.Education).Include(x => x.CandidateType).Include(x => x.Intake).Include(x => x.Semester).ToListAsync();
            if (datas != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Load data successfully!!",
                    Data = datas
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "No data"
                };
            }
        }

        // GET: api/Candidates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> GetCandidate(int id)
        {
            var candidate = await _context.Candidate.Include(x => x.Major).Include(x => x.Catalog).Include(x => x.Country).Include(x => x.Education).Include(x => x.CandidateType).Include(x => x.Intake).Include(x => x.Semester).Include(x => x.Stage).Include(x=>x.Year).Where(x => x.Id == id).FirstOrDefaultAsync();

            if (candidate != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Search for successful data!!",
                    Data = candidate
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not found!!"
                };
            }
        }

        // GET: api/Candidates/5
        [HttpGet("GetCandidateByStage/{stage_id}")]
        public async Task<ActionResult<BaseResponse>> GetCandidateByStage(int stage_id)
        {
            var candidate = await _context.Candidate.Include(x => x.Major).Include(x => x.Catalog).Include(x => x.Country).Include(x => x.Education).Include(x => x.Year).Include(x => x.CandidateType).Include(x => x.Intake).Include(x => x.Semester).Include(x => x.Stage).Where(x => x.STAGE_ID == stage_id).ToListAsync();

            if (candidate != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Search for successful data!!",
                    Data = candidate
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not found!!"
                };
            }
        }

        // GET: api/Candidates/GetCandidateByMajor/{id}
        [HttpGet("GetCandidateByMajor/{id}")]
        public async Task<ActionResult<BaseResponse>> GetCandidateByMajor(int major_id)
        {
            var candidate = await _context.Candidate.Include(x => x.Major).Include(x => x.Catalog).Include(x => x.Country).Include(x => x.Education).Include(x => x.CandidateType).Include(x => x.Intake).Include(x => x.Semester).Include(x => x.Stage).Where(x => x.MAJOR_ID == major_id).ToListAsync();

            if (candidate != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Search for successful data!!",
                    Data = candidate
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not found!!"
                };
            }
        }

        // GET: api/Candidates/GetCandidateByCatalog/{id}
        [HttpGet("GetCandidateByCatalog/{id}")]
        public async Task<ActionResult<BaseResponse>> GetCandidateByCatalog(int catalog_id)
        {
            var candidate = await _context.Candidate.Include(x => x.Major).Include(x => x.Catalog).Include(x => x.Country).Include(x => x.Education).Include(x => x.CandidateType).Include(x => x.Intake).Include(x => x.Semester).Include(x => x.Stage).Where(x => x.CATALOG_ID == catalog_id).ToListAsync();

            if (candidate != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Search for successful data!!",
                    Data = candidate
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not found!!"
                };
            }
        }

        // GET: api/Candidates/GetCandidateByDistrict/{id}
        [HttpGet("GetCandidateByCountry/{cou_id}")]
        public async Task<ActionResult<BaseResponse>> GetCandidateByDistrict(int cou_id)
        {
            var candidate = await _context.Candidate.Include(x => x.Major).Include(x => x.Catalog).Include(x => x.Country).Include(x => x.Education).Include(x => x.CandidateType).Include(x => x.Intake).Include(x => x.Semester).Include(x => x.Stage).Where(x => x.COUNTRY_ID == cou_id).ToListAsync();

            if (candidate != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Search for successful data!!",
                    Data = candidate
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not found!!"
                };
            }
        }

        // GET: api/Candidates/GetCandidateByEducation/{id}
        [HttpGet("GetCandidateByEducation/{id}")]
        public async Task<ActionResult<BaseResponse>> GetCandidateByEducation(int edu_id)
        {
            var candidate = await _context.Candidate.Include(x => x.Major).Include(x => x.Catalog).Include(x => x.Country).Include(x => x.Education).Include(x => x.CandidateType).Include(x => x.Intake).Include(x => x.Semester).Include(x => x.Stage).Where(x => x.EDUCATION_ID == edu_id).ToListAsync();

            if (candidate != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Search for successful data!!",
                    Data = candidate
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not found!!"
                };
            }
        }

        // GET: api/Candidates/GetCandidateByCandidateType/{id}
        [HttpGet("GetCandidateByCandidateType/{id}")]
        public async Task<ActionResult<BaseResponse>> GetCandidateByCandidateType(int can_id)
        {
            var candidate = await _context.Candidate.Include(x => x.Major).Include(x => x.Catalog).Include(x => x.Country).Include(x => x.Education).Include(x => x.CandidateType).Include(x => x.Intake).Include(x => x.Semester).Include(x => x.Stage).Where(x => x.TYPE_ID == can_id).ToListAsync();

            if (candidate != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Search for successful data!!",
                    Data = candidate
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not found!!"
                };
            }
        }

        // GET: api/Candidates/GetCandidateByIntake/{id}
        [HttpGet("GetCandidateByIntake/{id}")]
        public async Task<ActionResult<BaseResponse>> GetCandidateByIntake(int int_id)
        {
            var candidate = await _context.Candidate.Include(x => x.Major).Include(x => x.Catalog).Include(x => x.Country).Include(x => x.Education).Include(x => x.CandidateType).Include(x => x.Intake).Include(x => x.Semester).Include(x => x.Stage).Where(x => x.INTAKE_ID == int_id).ToListAsync();

            if (candidate != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Search for successful data!!",
                    Data = candidate
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not found!!"
                };
            }
        }

        // GET: api/Candidates/GetCandidateBySemester/{id}
        [HttpGet("GetCandidateBySemester/{id}")]
        public async Task<ActionResult<BaseResponse>> GetCandidateBySemester(int sem_id)
        {
            var candidate = await _context.Candidate.Include(x => x.Major).Include(x => x.Catalog).Include(x => x.Country).Include(x => x.Education).Include(x => x.CandidateType).Include(x => x.Intake).Include(x => x.Semester).Include(x => x.Stage).Where(x => x.SEM_ID == sem_id).ToListAsync();

            if (candidate != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Search for successful data!!",
                    Data = candidate
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not found!!"
                };
            }
        }

        // PUT: api/Candidates/5
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse>> PutCandidate(int id, Candidate candidate_update)
        {
            Regex rx = new Regex(@"^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$");
            var candidate = await _context.Candidate.FindAsync(id);
            if (candidate == null)
            {
                return NotFound();
            }
            else if (String.IsNullOrEmpty(candidate_update.CandidateId)
                || String.IsNullOrEmpty(candidate_update.LastName)
                || String.IsNullOrEmpty(candidate_update.FirstName)
                || String.IsNullOrEmpty(candidate_update.Phone)
                || String.IsNullOrEmpty(candidate_update.HomeAddress)
                || String.IsNullOrEmpty(candidate_update.CountryAddress)
                || String.IsNullOrEmpty(candidate_update.ProvinceAddress)
                || String.IsNullOrEmpty(candidate_update.DistrictAddress)
                || String.IsNullOrEmpty(candidate_update.PlaceOfBirth)
                || String.IsNullOrEmpty(candidate_update.HighSchoolCity)
                || String.IsNullOrEmpty(candidate_update.HighSchoolName)
                || String.IsNullOrEmpty(candidate_update.Email)
                || String.IsNullOrEmpty(candidate_update.CardId)
                || String.IsNullOrEmpty(candidate_update.DocumentCode)
                || Convert.ToInt32(candidate_update.CATALOG_ID) == 0
                || Convert.ToInt32(candidate_update.STAGE_ID) == 0
                || Convert.ToInt32(candidate_update.SEM_ID) == 0
                || Convert.ToInt32(candidate_update.YEAR_ID) == 0
                || Convert.ToInt32(candidate_update.Gender) == 0
                || Convert.ToInt32(candidate_update.INTAKE_ID) == 0
                || Convert.ToInt32(candidate_update.MaritalStatus) == 0
                || Convert.ToInt32(candidate_update.GraduateYear) == 0
                || Convert.ToInt32(candidate_update.EDUCATION_ID) == 0
                || Convert.ToInt32(candidate_update.TYPE_ID) == 0
                || Convert.ToInt32(candidate_update.MAJOR_ID) == 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not be empty. Please check again!!"
                };
            }
            else if (candidate_update.Phone.Length != 10)
            {
                return new BaseResponse
                {
                    ErrorCode = 6,
                    Messege = "Phone Number only up to 10 numbers. Please check again!!"
                };
            }
            else if (candidate_update.CardId.Length != 9)
            {
                return new BaseResponse
                {
                    ErrorCode = 7,
                    Messege = "Card ID only up to 9 numbers. Please check again!!"
                };
            }
            else if (!rx.IsMatch(candidate_update.Email))
            {
                return new BaseResponse
                {
                    ErrorCode = 8,
                    Messege = "Invalid email. Please check again!!"
                };
            }
            else
            {
                candidate.STAGE_ID = candidate_update.STAGE_ID;
                candidate.MAJOR_ID = candidate_update.MAJOR_ID;
                candidate.CATALOG_ID = candidate_update.CATALOG_ID;
                candidate.COUNTRY_ID = candidate_update.COUNTRY_ID;
                candidate.EDUCATION_ID = candidate_update.EDUCATION_ID;
                candidate.YEAR_ID = candidate_update.YEAR_ID;
                candidate.TYPE_ID = candidate_update.TYPE_ID;
                candidate.INTAKE_ID = candidate_update.INTAKE_ID;
                candidate.SEM_ID = candidate_update.SEM_ID;
                candidate.CandidateId = candidate_update.CandidateId;
                candidate.LastName = candidate_update.LastName;
                candidate.FirstName = candidate_update.FirstName;
                candidate.DateOfBirth = candidate_update.DateOfBirth;
                candidate.Gender = candidate_update.Gender;
                candidate.Phone = candidate_update.Phone;
                candidate.HomeAddress = candidate_update.HomeAddress;
                candidate.CountryAddress = candidate_update.CountryAddress;
                candidate.ProvinceAddress = candidate_update.ProvinceAddress;
                candidate.DistrictAddress = candidate_update.DistrictAddress;
                candidate.PlaceOfBirth = candidate_update.PlaceOfBirth;
                candidate.MaritalStatus = candidate_update.MaritalStatus;
                candidate.HighSchoolName = candidate_update.HighSchoolName;
                candidate.HighSchoolCity = candidate_update.HighSchoolCity;
                candidate.GraduateYear = candidate_update.GraduateYear;
                candidate.RegistryDate = candidate_update.RegistryDate;
                candidate.Email = candidate_update.Email;
                candidate.CardId = candidate_update.CardId;
                candidate.FinalResult = candidate_update.FinalResult;
                candidate.DocumentCode = candidate_update.DocumentCode;

                _context.Candidate.Update(candidate);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Successful update!!"
                };
            }
        }

        // POST: api/Candidates
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> PostCandidate(Candidate candidate)
        {
            Regex rx = new Regex(@"^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$");
            var datasCID = _context.Candidate.Where(x => x.CandidateId.Equals(candidate.CandidateId.Trim())).ToList();
            var datasPhone = _context.Candidate.Where(x => x.Phone.Equals(candidate.Phone.Trim())).ToList();
            var datasCMND = _context.Candidate.Where(x => x.CardId.Equals(candidate.CardId.Trim())).ToList();
            var datasDCC = _context.Candidate.Where(x => x.DocumentCode.Equals(candidate.DocumentCode.Trim())).ToList();
            if (String.IsNullOrEmpty(candidate.CandidateId) 
                || String.IsNullOrEmpty(candidate.LastName) 
                || String.IsNullOrEmpty(candidate.FirstName) 
                || String.IsNullOrEmpty(candidate.Phone) 
                || String.IsNullOrEmpty(candidate.HomeAddress) 
                || String.IsNullOrEmpty(candidate.CountryAddress) 
                || String.IsNullOrEmpty(candidate.ProvinceAddress) 
                || String.IsNullOrEmpty(candidate.DistrictAddress) 
                || String.IsNullOrEmpty(candidate.PlaceOfBirth) 
                || String.IsNullOrEmpty(candidate.HighSchoolCity) 
                || String.IsNullOrEmpty(candidate.HighSchoolName) 
                || String.IsNullOrEmpty(candidate.Email) 
                || String.IsNullOrEmpty(candidate.CardId) 
                || String.IsNullOrEmpty(candidate.DocumentCode)
                || Convert.ToInt32(candidate.CATALOG_ID) == 0
                || Convert.ToInt32(candidate.STAGE_ID) == 0
                || Convert.ToInt32(candidate.SEM_ID) == 0
                || Convert.ToInt32(candidate.YEAR_ID) == 0
                || Convert.ToInt32(candidate.Gender) == 0
                || Convert.ToInt32(candidate.INTAKE_ID) == 0
                || Convert.ToInt32(candidate.MaritalStatus) == 0
                || Convert.ToInt32(candidate.GraduateYear) == 0
                || Convert.ToInt32(candidate.EDUCATION_ID) == 0
                || Convert.ToInt32(candidate.TYPE_ID) == 0
                || Convert.ToInt32(candidate.MAJOR_ID) == 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not be empty. Please check again!!"
                };
            }
            else if(datasCID.Count != 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 2,
                    Messege = "Candidate ID already exists. Please check again!!"
                };
            }
            else if (datasCMND.Count != 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 3,
                    Messege = "Card ID already exists. Please check again!!"
                };
            }
            else if (datasDCC.Count != 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 4,
                    Messege = "Document Code already exists. Please check again!!"
                };
            }
            else if (datasPhone.Count != 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 5,
                    Messege = "Phone Number already exists. Please check again!!"
                };
            }
            else if(candidate.Phone.Length != 10)
            {
                return new BaseResponse
                {
                    ErrorCode = 6,
                    Messege = "Phone Number only up to 10 numbers. Please check again!!"
                };
            }
            else if (candidate.CardId.Length != 9)
            {
                return new BaseResponse
                {
                    ErrorCode = 7,
                    Messege = "Card ID only up to 9 numbers. Please check again!!"
                };
            }
            else if (!rx.IsMatch(candidate.Email))
            {
                return new BaseResponse
                {
                    ErrorCode = 8,
                    Messege = "Invalid email. Please check again!!"
                };
            }
            else
            {
                _context.Candidate.Add(candidate);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Add new success!!",
                    Data = CreatedAtAction("GetCandidate", new { id = candidate.Id }, candidate)
                };
            }
        }

        // DELETE: api/Candidates/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> DeleteCandidate(int id)
        {
            var candidate = await _context.Candidate.FindAsync(id);
            if (candidate != null)
            {
                _context.Candidate.Remove(candidate);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Delete success!!",
                    Data = candidate
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "No data needed to delete!!"
                };
            }
        }
    }
}
