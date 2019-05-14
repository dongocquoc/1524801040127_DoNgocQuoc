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
    public class InputTypesController : ControllerBase
    {
        private readonly QLHocVienContext _context;

        public InputTypesController(QLHocVienContext context)
        {
            _context = context;
        }

        // GET: api/InputTypes
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> GetInputType()
        {
            var datas = await _context.InputType.ToListAsync();
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

        // GET: api/InputTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> GetInputType(int id)
        {
            var inputType = await _context.InputType.FindAsync(id);

            if (inputType != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = new InputType()
                    {
                        Id = inputType.Id,
                        InputName = inputType.InputName
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

        // PUT: api/InputTypes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInputType(int id, InputType inputType_update)
        {
            var inputType = await _context.InputType.FindAsync(id);
            if (inputType == null)
            {
                return NotFound();
            }
            inputType.InputName = inputType_update.InputName;
            _context.InputType.Update(inputType);
            await _context.SaveChangesAsync();

            return Ok(inputType);
        }

        // POST: api/InputTypes
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> PostInputType(InputType inputType)
        {
            if (String.IsNullOrEmpty(inputType.InputName))
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Thêm mới thất bại!!"
                };
            }
            else
            {
                _context.InputType.Add(inputType);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Thêm mới thành công!!",
                    Data = CreatedAtAction("GetInputType", new { id = inputType.Id }, inputType)
                };
            }
        }

        // DELETE: api/InputTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> DeleteInputType(int id)
        {
            var inputType = await _context.InputType.FindAsync(id);
            if (inputType != null)
            {
                _context.InputType.Remove(inputType);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Xóa thành công!!",
                    Data = inputType
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Không tìm thấy dữ liệu cần xóa"
                };
            }
        }
    }
}
