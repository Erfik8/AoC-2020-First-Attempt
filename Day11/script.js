var input_table = [];
var copy_table = [];
var new_table = [];

function part1()
{
  do
  {
    copy_table = [];
    for(var a= 0; a < input_table.length ; a++)
    {
      copy_table.push([...new_table[a]]);
    }

    var changed = false;

    for(var x = 0; x < new_table.length; x++)
    {
      for(var y = 0; y < new_table[x].length; y++)
      {
        if(copy_table[x][y] != ".")
        {
          var change = true;
          var count_occupied = 0;
          var from_row = x - 1 > 0 ? x-1:0;
          var to_row = x + 1 < copy_table.length-1 ? x+1: copy_table.length-1;
          var from_col = y -1 > 0 ? y-1: 0;
          var to_col = y +1 < copy_table[x].length-1 ? y +1:copy_table[x].length-1;
          for(var c = from_row; c <= to_row; c++ )
          {
            for(var d = from_col; d <= to_col; d++ )
            {
              if(d ==y && c ==x )continue;
              if (copy_table[c][d] == "#")
              {
                if(copy_table[x][y] == "L")change = false;
                else if(copy_table[x][y] == "#")++count_occupied;
              }

              if(!change && copy_table[x][y] == "L") break;
            }
            if(!change && copy_table[x][y] == "L") break;
          }
          if(count_occupied < 4 && copy_table[x][y] == "#") change = false;

          if(change)
          {
            if(copy_table[x][y] == "L") new_table[x][y] = "#";
            else if(copy_table[x][y] == "#") new_table[x][y] = "L";
            changed = true;
          }
        }
      }

    }
  }while(changed);

  count_seats = 0;
  for(var e = 0; e < new_table.length; e++)
  {
    for (var f = 0; f < new_table[0].length; f++) if(new_table[e][f] == "#") ++ count_seats;
  }

  return count_seats;
}


function part2()
{
  do
  {
    //console.log(new_table);
    copy_table = [];
    for(var a = 0; a < input_table.length ; a++)
    {
      copy_table.push([...new_table[a]]);
    }
    var changed = false;

    for(var x = 0; x < copy_table.length; x++)
    {
      for(var y = 0; y < copy_table[x].length; y++)
      {
        if(copy_table[x][y] != ".")
        {
          var map = [];
          for(var v = 0; v < 3; v++) map.push(new Array(3));
          var start = 1;
          do
          {
            for(var c = -1; c <= 1; c++)
            {
              for(var d = -1; d <= 1; d++)
              {
                if (d == 0 && c == 0)
                {
                  map[1][1] = copy_table[x][y];
                  continue;
                }

                var row = x + c*start;
                var col = y + d*start;
                //console.log("row: " + row + " col: " + col);
                if(copy_table[row] == undefined || copy_table[row][col] == undefined)
                {
                    if(c == -1 && d == -1 && map[0][0] == undefined) map[0][0] = ".";
                    else if(c == -1 && d == 0 && map[0][1] == undefined) map[0][1] = ".";
                    else if(c == -1 && d == 1 && map[0][2] == undefined) map[0][2] = ".";
                    else if(c == 0 && d == -1 && map[1][0] == undefined) map[1][0] = ".";
                    else if(c == 0 && d == 1 && map[1][2] == undefined) map[1][2] = ".";
                    else if(c == 1 && d == -1 && map[2][0] == undefined) map[2][0] = ".";
                    else if(c == 1 && d == 0 && map[2][1] == undefined) map[2][1] = ".";
                    else if(c == 1 && d == 1 && map[2][2] == undefined) map[2][2] = ".";
                }
                else
                {
                  if(copy_table[row][col] != "." && map[c+1][d+1] == undefined)
                  map[c+1][d+1] = copy_table[row][col];
                }
              }
            }
            //console.log(map);
            var all_seats = true;
            for(var a = 0; a < 3; a++)
            {
              for(var b = 0; b < 3; b++)
              {
                if(map[a][b] == undefined)
                {
                  all_seats = false;
                  break;
                }
              }
            }
            //console.log(all_seats);
            ++start;

          }while(all_seats == false);

          var change = true;

          if(copy_table[x][y] == "L")
          {
            for(var a = 0; a < 3; a++)
            {
              for(var b = 0; b < 3; b++)
              {
                if(map[a][b] == "#")
                {
                  change = false;
                }
              }
            }
          }
          else if(copy_table[x][y] == "#")
          {
            var count_empty = 0;
            for(var a = 0; a < 3; a++)
            {
              for(var b = 0; b < 3; b++)
              {
                if(b == 1 && a == 1) continue;
                if(map[a][b] == "#")
                {
                  ++count_empty;
                }
              }
            }
            if(count_empty < 5) change = false;
          }

          if(change)
          {
            if(copy_table[x][y] == "L") new_table[x][y] = "#";
            else if(copy_table[x][y] == "#") new_table[x][y] = "L";
            changed = true;
            //console.log("changed");
          }
        }
      }
    }

  }while(changed);

  count_seats = 0;
  for(var e = 0; e < new_table.length; e++)
  {
    for (var f = 0; f < new_table[0].length; f++) if(new_table[e][f] == "#") ++ count_seats;
  }
  return count_seats;
}


function input_day()
{
  input_table = document.getElementById("result").innerHTML.split("\n").map(x => x.trim()).map(x => x.split(""));



  for(var a= 0; a < input_table.length; a++)
  {
    copy_table.push([...input_table[a]]);
    new_table.push([...copy_table[a]]);
  }
  var val1 = part1();
  console.log(val1);

  new_table = [];
  copy_table = [];
  //console.log(new_table);
  for(var a= 0; a < input_table.length; a++)
  {
    copy_table.push([...input_table[a]]);
    new_table.push([...copy_table[a]]);
  }
  //console.log(new_table);
  var val2 = part2();
  console.log(val2);

}
// 15:22

// 3 days XD

// that solution is sooo slow and ugly - i am not proud of that
