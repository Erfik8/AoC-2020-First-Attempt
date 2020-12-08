function part1(input_table)
{
  var a = 0, b = input_table.length-1;
  while(input_table[a] + input_table[b] != 2020)
  {
    if(input_table[a] + input_table[b] > 2020) --b;
    else if(input_table[a] + input_table[b] < 2020) ++a;
  }
  return input_table[a]*input_table[b];
}

function part2(input_table, first_value, index)
{
  var a = index+1, b = input_table.length-1;
  var subsum = 2020 - first_value;
  while(input_table[a] + input_table[b] != subsum)
  {
    if(input_table[a] + input_table[b] > subsum) --b;
    else if(input_table[a] + input_table[b] < subsum) ++a;
    if (a == b) break;
  }
  if (a == b) return part2(input_table, input_table[index+1], index+1);
  else return (first_value * input_table[a] * input_table[b]);
}

function input_day()
{
  var input_table = document.getElementById("result").innerHTML.split("\n").map(x => x*1);
  input_table = input_table.filter(x => x != 0);
  input_table.sort(function(a,b){return a > b});
  var sum = 0;
  console.log(part1(input_table));
  console.log(part2(input_table, input_table[0], 0));



}
