using System;
using System.Collections.Generic;
using System.Linq;
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
    public class DocumentsController : ControllerBase
    {
        private readonly QLHocVienContext _context;

        public DocumentsController(QLHocVienContext context)
        {
            _context = context;
        }

        // GET: api/Documents
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> GetDocument()
        {
            var datas = await _context.Documents.Include(x => x.InputTypes).Include(x => x.Statuss).ToListAsync();
            if (datas != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Load dữ liệu thành công!!",
                    Data = datas
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Không có dữ liệu"
                };
            }
        }

        // GET: api/Documents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> GetDocument(int id)
        {
            var document = await _context.Documents.Include(x => x.InputTypes).Include(x => x.Statuss).Where(x => x.Id == id).FirstOrDefaultAsync();

            if (document != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = new Document()
                    {
                        Id = document.Id,
                        NameInEnglish = document.NameInEnglish,
                        NameInVietnamese = document.NameInVietnamese,
                        SequenceNumber = document.SequenceNumber,
                        INPUTTYPE = document.INPUTTYPE,
                        STATUS = document.STATUS,
                        Note = document.Note
                    }
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Không tìm thấy!!"
                };
            }
        }

        // PUT: api/Documents/5
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse>> PutDocument(int id, Document document_update)
        {
            var Doc = await _context.Documents.FindAsync(id);
            var datasE = _context.Documents.Where(x => x.NameInEnglish.Equals(document_update.NameInEnglish.Trim())).ToList();
            var datasV = _context.Documents.Where(x => x.NameInVietnamese.Equals(document_update.NameInVietnamese.Trim())).ToList();
            var datas = _context.Documents.Where(x => x.NameInEnglish.Equals(document_update.NameInEnglish.Trim())).Where(y => y.NameInVietnamese.Equals(document_update.NameInVietnamese.Trim())).ToList();
            if (Doc == null)
            {
                return NotFound();
            }
            else if (String.IsNullOrEmpty(document_update.NameInEnglish) || String.IsNullOrEmpty(document_update.NameInVietnamese) || Convert.ToInt32(document_update.STATUS) == 0 || Convert.ToInt32(document_update.INPUTTYPE) == 0 || Convert.ToInt32(document_update.SequenceNumber) == 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not be emty!!"
                };
            }
            else if (datas.Count != 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 2,
                    Messege = "Document already exist!!"
                };
            }
            else if (datasE.Count != 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 3,
                    Messege = "English Name already exist!!"
                };
            }
            else if (datasV.Count != 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 4,
                    Messege = "VietNamese Name already exist!!"
                };
            }
            else
            {
                Doc.NameInEnglish = document_update.NameInEnglish;
                Doc.NameInVietnamese = document_update.NameInVietnamese;
                Doc.SequenceNumber = document_update.SequenceNumber;
                Doc.INPUTTYPE = document_update.INPUTTYPE;
                Doc.STATUS = document_update.STATUS;
                Doc.Note = document_update.Note;

                _context.Documents.Update(Doc);
                await _context.SaveChangesAsync();

                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Update success!!"
                };
            }
        }

        // POST: api/Documents
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> PostDocument(Document document)
        {
            var datasE = _context.Documents.Where(x => x.NameInEnglish.Equals(document.NameInEnglish.Trim())).ToList();
            var datasV = _context.Documents.Where(x => x.NameInVietnamese.Equals(document.NameInVietnamese.Trim())).ToList();
            var datas = _context.Documents.Where(x => x.NameInEnglish.Equals(document.NameInEnglish.Trim())).Where(y => y.NameInVietnamese.Equals(document.NameInVietnamese.Trim())).ToList();
            if (String.IsNullOrEmpty(document.NameInEnglish) || String.IsNullOrEmpty(document.NameInVietnamese) || Convert.ToInt32(document.STATUS) == 0 || Convert.ToInt32(document.INPUTTYPE) == 0 || Convert.ToInt32(document.SequenceNumber) == 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not be emty!!"
                };
            }
            else if(datas.Count != 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 2,
                    Messege = "Document already exist!!"
                };
            }
            else if (datasE.Count != 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 3,
                    Messege = "English Name already exist!!"
                };
            }
            else if (datasV.Count != 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 4,
                    Messege = "VietNamese Name already exist!!"
                };
            }
            else
            {
                _context.Documents.Add(document);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Add new success!!",
                    Data = CreatedAtAction("GetDocument", new { id = document.Id }, document)
                };
            }
        }

        // DELETE: api/Documents/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> DeleteDocument(int id)
        {
            var document = await _context.Documents.FindAsync(id);
            if (document != null)
            {
                _context.Documents.Remove(document);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Delete success!!",
                    Data = document
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
