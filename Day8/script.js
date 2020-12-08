function part1(input_table)
{
  var accumulator = 0;
  var instruction_table = new Array();
  var index = 0;
  instruction_table.push(index);
  while(instruction_table.length == [...new Set(instruction_table)].length)
  {
    var instr = input_table[index].split(" ")[0];
    var val = parseInt(input_table[index].split(" ")[1]);
    switch(instr)
    {
      case "acc":
      {
        accumulator += val;
        ++index;
      }break;
      case "jmp":
      {
        index += val;
      }break;
      case "nop":
      default:
      {
        ++index;
      }break;
    }
    instruction_table.push(index);
  }
  return accumulator;
}
function try_part1(input_table, change_index)
{
  var accumulator = 0;
  var instruction_table = new Array();
  var index = 0;
  instruction_table.push(index);
  var continued = true;
  while(continued = instruction_table.length == [...new Set(instruction_table)].length ? true : false)
  {
    if(index >= input_table.length) break;
    var instr = input_table[index].split(" ")[0];
    var val = parseInt(input_table[index].split(" ")[1]);
    if(change_index == index)
    {
      if(instr == "jmp") instr = "nop"
      else instr = "jmp";
    }
    switch(instr)
    {
      case "acc":
      {
        accumulator += val;
        ++index;
      }break;
      case "jmp":
      {
        index += val;
      }break;
      case "nop":
      default:
      {
        ++index;
      }break;
    }
    instruction_table.push(index);
  }
  return continued == true ? accumulator : " ";
}

function part2(input_table)
{
  var accumulator = 0;
  var instruction_table = new Array();
  var nop_jmp_table = new Array();
  var index = 0;
  instruction_table.push(index);
  while(instruction_table.length == [...new Set(instruction_table)].length)
  {
    var instr = input_table[index].split(" ")[0];
    var val = parseInt(input_table[index].split(" ")[1]);
    switch(instr)
    {
      case "acc":
      {
        accumulator += val;
        ++index;
      }break;
      case "jmp":
      {
        nop_jmp_table.push(index);
        index += val;
      }break;
      case "nop":
      {
        nop_jmp_table.push(index);
        ++index;
      }
      default:
      {
        ++index;
      }break;
    }
    instruction_table.push(index);
  }
  for(var a = 0; a < nop_jmp_table.length; a++)
  {
    var result = try_part1(input_table, nop_jmp_table[a]);
    if(result != " ") return result;
  }
}

function input_day()
{
  var input_table = document.getElementById("result").innerHTML.split("\n").map(x => x.trim());
  console.log(part1(input_table));
  console.log(part2(input_table));

}

// 14:55

// part1 - 15:13 (~20 minutes)

// part2 - 15:38 (~25 minutes from part1)

// It took me 45 minutes to figure out solution
