function part1(input_table)
{
  var preamble = 25;
  var valid_index = 0;
  for(var a = preamble; a < input_table.length; a++)
  {
    var start = a - preamble;
    var end = a-1;
    var subtable = input_table.slice(start, a).sort(function(a,b){return a > b});
    while(subtable[start-(a-preamble)] + subtable[end-(a-preamble)] != input_table[a])
    {
      if(start == end)
      {
        valid_index = a;
        break;
      }
      else if((subtable[start-(a-preamble)] + subtable[end-(a-preamble)]) == input_table[a]) break;
      else if((subtable[start-(a-preamble)] + subtable[end-(a-preamble)]) > input_table[a]) --end;
      else if((subtable[start-(a-preamble)] + subtable[end-(a-preamble)]) < input_table[a]) ++start;

    }
    if(valid_index != 0) break;
  }
  return input_table[valid_index];
}

function part2(input_table, invalid_number, set_ofnumbers, max_index)
{
  var end_sum = 0;
  var first_index = 0;
  for(var a = 0; a + set_ofnumbers <= max_index; a++)
  {
    var sum = 0;
    for(var b = a; b - a < set_ofnumbers; b++) sum += input_table[b];
    if(sum == invalid_number)
    {
      first_index = a;
      end_sum = sum;
      break;
    }
  }
  if(end_sum == 0)
  {
    return part2(input_table, invalid_number, ++set_ofnumbers, max_index);
  }
  else
  {
    var subtable = input_table.slice(first_index, first_index + set_ofnumbers-1);
    subtable.sort(function(a,b){return a > b});
    return subtable[0] + subtable[subtable.length-1];
  }
}

function input_day()
{
  var input = document.getElementById("result").innerHTML.split("\n").map(x => parseInt(x));
  var invalid_number = part1(input);
  var index_of_invalid = input.indexOf(invalid_number);
  console.log(index_of_invalid);
  console.log(part2(input,invalid_number,2,index_of_invalid));

}

// 16:31

// part1 - 17:10 (~40 minutes)

// part2 - 17:56 (another 40 minutes)

// common problems
//  -  infinite loops
//  -  infinite recursion
//  -  reading wrong indeks (especially in part1 - creapy index calculation)
