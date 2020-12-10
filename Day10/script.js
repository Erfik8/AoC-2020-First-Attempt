function part1(input_table)
{
  var ones = 0;
  var threes = 0;
  if(input_table[0] == 1) ++ones;
  else if(input_table[0] == 3) ++threes;
  for(var a = 1; a < input_table.length; a++)
  {
    if(input_table[a] - input_table[a-1] == 1) ++ones;
    else if(input_table[a] - input_table[a-1] == 3) ++threes;
    else if(input_table[a] - input_table[a-1] > 3)
    {
      break;
    }
  }
++threes;
  return ones*threes;
}

function part2(input_table, last_index, end_index, end_index_value)
{
  var end_value = 0;
  if(last_index <= end_index) return end_index_value;
  var indexes = new Array();
  for(var a = 1; a <= 3; a++)
  {
    if(input_table[last_index] - a == 0)
    {
      end_value += part2(input_table,end_index, end_index, end_index_value);
      break;
    }
    else if(input_table.includes(input_table[last_index]-a))
    {
      end_value += part2(input_table,input_table.indexOf(input_table[last_index]-a), end_index, end_index_value);
    }
  }
  return end_value;

}

function input_day()
{
  var input = document.getElementById("result").innerHTML.split("\n").map(x => parseInt(x));
  input.sort(function(a,b){return a > b});
  console.log(part1(input));
  console.log(part2(input,input.length-1,52,part2(input,52, 0, 1)));

}
// 20:23

// part1 - 20:42 (~ 20 minutes) (mistaken because of wrong interpretation)

//part2 > 3 hours (many problems with heavy recursion. I need to improve this solution - this is ugly, but work)
