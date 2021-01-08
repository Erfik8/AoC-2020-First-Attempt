function part1(input_table)
{
  var input_grid = [];
  for(var line of input_table)
  {
    input_grid.push(line.split(""));
  }

  var three_dim_grid = [];
  var x_size = input_table.length + 12;
  var y_size = input_table.length + 12;
  var z_size = input_table.length + 12;

  var x_center = parseInt(x_size/2);
  var y_center = parseInt(y_size/2);
  var z_center = parseInt(z_size/2);
  for(var a = 0; a < z_size; a++)
  {
    three_dim_grid.push(new Array());
    for(var b = 0; b < y_size; b++)
    {
      three_dim_grid[a].push(new Array());
      for(var c = 0; c < x_size; c++)
      {
        if((a == z_center) &&
           (b >= (y_center - parseInt(input_table.length/2))) &&
           (b <= (y_center + parseInt(input_table.length/2))) &&
           (c >= (x_center - parseInt(input_table.length/2))) &&
           (c <= (x_center + parseInt(input_table.length/2))))
        {
          //  console.log(input_grid[b-6][c-6]);
            var start_cube_state = input_grid[b-6][c-6];
            var bool_state = start_cube_state == "#" ? true : false;
            three_dim_grid[a][b].push(bool_state);
          //  console.log(three_dim_grid);
        }
        else
        {
          three_dim_grid[a][b].push(false);
        }
      }
    }
  }
  //console.log(three_dim_grid);

  var cycles = 6;
  for(var d = 0; d < cycles; d++)
  {
    var list_of_changes = [];

    for(var a = 0; a < z_size; a++)
    {
      for(var b = 0; b < y_size; b++)
      {
        for(var c = 0; c < x_size; c++)
        {
          var active_elements_counter = 0;
          for(var a1 = a-1; a1 <= a+1; a1++)
          {
            for(var b1 = b-1; b1 <= b+1; b1++)
            {
              for(var c1 = c-1; c1 <= c+1; c1++)
              {
                if(three_dim_grid[a1] == undefined ||
                   three_dim_grid[a1][b1] == undefined ||
                   three_dim_grid[a1][b1][c1] == undefined) continue;
                if(a1 == a && b1 == b && c1 == c) continue;
                if(three_dim_grid[a1][b1][c1] == true) ++active_elements_counter;
              }
            }
          }
          if(active_elements_counter == 3 && three_dim_grid[a][b][c] == false) list_of_changes.push(new Array(a,b,c));
          else if(!(active_elements_counter == 2 || active_elements_counter == 3) &&
                  three_dim_grid[a][b][c] == true) list_of_changes.push(new Array(a,b,c));

        }
      }
    }
    for(var coords of list_of_changes)
    {
      three_dim_grid[coords[0]][coords[1]][coords[2]] = three_dim_grid[coords[0]][coords[1]][coords[2]] == true ? false : true;
    }
    //console.log(list_of_changes);
  }
  var count_active = 0;
  for(var a = 0; a < z_size; a++)
  {
    for(var b = 0; b < y_size; b++)
    {
      for(var c = 0; c < x_size; c++)
      {
        if(three_dim_grid[a][b][c] == true) ++count_active;
      }
    }
  }
  return count_active;
  //console.log(three_dim_grid);
}
function part2(input_table)
{
  var input_grid = [];
  for(var line of input_table)
  {
    input_grid.push(line.split(""));
  }

  var three_dim_grid = [];
  var x_size = input_table.length + 12;
  var y_size = input_table.length + 12;
  var z_size = input_table.length + 12;
  var w_size = input_table.length + 12;

  var x_center = parseInt(x_size/2);
  var y_center = parseInt(y_size/2);
  var z_center = parseInt(z_size/2);
  var w_center = parseInt(w_size/2);
  for(var a = 0; a < w_size; a++)
  {
    three_dim_grid.push(new Array());
    for(var b = 0; b < z_size; b++)
    {
      three_dim_grid[a].push(new Array());
      for(var c = 0; c < y_size; c++)
      {
        three_dim_grid[a][b].push(new Array());
        for(var d = 0; d < x_size; d++)
        {
            if((a == w_center) && (b == z_center) &&
               (c >= (y_center - parseInt(input_table.length/2))) &&
               (c <= (y_center + parseInt(input_table.length/2))) &&
               (d >= (x_center - parseInt(input_table.length/2))) &&
               (d <= (x_center + parseInt(input_table.length/2))))
                {
                    //  console.log(input_grid[b-6][c-6]);
                      var start_cube_state = input_grid[c-6][d-6];
                      var bool_state = start_cube_state == "#" ? true : false;
                      three_dim_grid[a][b][c].push(bool_state);
                    //  console.log(three_dim_grid);
                  }
                  else
                  {
                    three_dim_grid[a][b][c].push(false);
                  }
        }
      }
    }
  }
  //console.log(three_dim_grid);

  var cycles = 6;
  for(var e = 0; e < cycles; e++)
  {
    var list_of_changes = [];

    for(var a = 0; a < w_size; a++)
    {
      for(var b = 0; b < z_size; b++)
      {
        for(var c = 0; c < y_size; c++)
        {
          for(var d = 0; d < x_size; d++)
          {
            var active_elements_counter = 0;
            for(var a1 = a-1; a1 <= a+1; a1++)
            {
              for(var b1 = b-1; b1 <= b+1; b1++)
              {
                for(var c1 = c-1; c1 <= c+1; c1++)
                {
                  for(var d1 = d-1; d1 <= d+1; d1++)
                  {
                    if(three_dim_grid[a1] == undefined ||
                       three_dim_grid[a1][b1] == undefined ||
                       three_dim_grid[a1][b1][c1] == undefined ||
                       three_dim_grid[a1][b1][c1][d1] == undefined)
                       continue;
                    if(a1 == a && b1 == b && c1 == c && d1 == d) continue;
                    if(three_dim_grid[a1][b1][c1][d1] == true) ++active_elements_counter;
                  }
                }
              }
            }
            if(active_elements_counter == 3 && three_dim_grid[a][b][c][d] == false) list_of_changes.push(new Array(a,b,c,d));
            else if(!(active_elements_counter == 2 || active_elements_counter == 3) &&
                    three_dim_grid[a][b][c][d] == true) list_of_changes.push(new Array(a,b,c,d));

          }
        }
      }
    }
    for(var coords of list_of_changes)
    {
      three_dim_grid[coords[0]][coords[1]][coords[2]][coords[3]] = three_dim_grid[coords[0]][coords[1]][coords[2]][coords[3]] == true ? false : true;
    }
    //console.log(list_of_changes);
  }
  var count_active = 0;
  for(var a = 0; a < w_size; a++)
  {
    for(var b = 0; b < z_size; b++)
    {
      for(var c = 0; c < y_size; c++)
      {
        for(var d = 0; d < x_size; d++)
        {
          if(three_dim_grid[a][b][c][d] == true) ++count_active;
        }
      }
    }
  }
  return count_active;
}
function input_day()
{
  input_table = document.getElementById("result").innerHTML.split("\n").map(x => x.trim());
  console.log(part1(input_table));
  console.log(part2(input_table));

}
// 21:27


// about 4 hours lost becaus of misunderstanding and confusion with example input. Part2 is very slow, need optimalisation (because of about <65 mln checks);

// and yes, I used to look at some pages with solved code only for check error in my own. But the only error was my brain.
