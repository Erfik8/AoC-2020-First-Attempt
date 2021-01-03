function part1(input_table)
{
  var map = [];
  var iter = 0;
  for(var num of input_table)
  {
    map.unshift(parseInt(num));
    ++iter;
  }
  do
  {
    var key_num = map[0];
    var id_of_num = map.findIndex(function(element,index){return (element == key_num && index != 0)});
    if(id_of_num == -1) map.unshift(0);
    else map.unshift(id_of_num);
    ++iter;
  }while(iter != 2020);
  return map[0];
}
function part2(input_table)
{
  var map = [];
  var turn = 1;
  var previous_num = 0;
  for(var num of input_table)
  {
    map[parseInt(num)] = turn;
    ++turn;
  }
  var next = 0;
  do
  {
    var temp = undefined;
    if(map[next] == undefined)
    {
      temp = 0;
      map[next] = turn;
      next = temp;
    }
    else
    {
      temp = turn - map[next];
      map[next] = turn;
      next = temp;
    }
    ++turn;
  }while(turn != 30000000)
  return next;
}
function input_day()
{
  input_table = document.getElementById("result").innerHTML.split(",").map(x => x.trim());
  console.log(part1(input_table));
  console.log(part2(input_table));

}
// 21:44
// 22:20 part1
// 23:07 part2 (second solution takes too much time)
