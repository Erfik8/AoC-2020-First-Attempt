var start_x_pos = 17;
var start_y_pos = 8;

function part1(input_table)
{
  var direction = 1;
  // 0 - north;
  // 1 - east;
  // 2 - south
  // 3 - west;
  var pos_x = 0;
  var pos_y = 0;

  for (var nav of input_table) {
    var instruct = nav.split("")[0];
    var val = parseInt(nav.substr(1));
    switch(instruct)
    {
      case 'N':
      {
        pos_y -= val;
      }break;
      case 'S':
      {
        pos_y += val;
      }break;
      case 'E':
      {
        pos_x += val;
      }break;
      case 'W':
      {
        pos_x -= val;
      }break;
      case 'R':
      {
        val = val/90;
        direction += val;
        if(direction >=4 ) direction -= 4;
      }break;
      case 'L':
      {
        val = val/90;
        direction -= val;
        if(direction < 0) direction += 4;
      }break;
      case 'F':
      {
        switch(direction)
        {
          case 0: pos_y -= val; break;
          case 1: pos_x += val; break;
          case 2: pos_y += val; break;
          case 3: pos_x -= val; break;
        }
      }break;
    }
    //console.log("pos x: " + pos_x + " pos_y: " + pos_y);
  }


  if(pos_x < 0) pos_x *= -1;
  if(pos_y < 0) pos_y *= -1;

  return pos_x + pos_y;
}

function part2(input_table)
{
  var way_val_x = 10;
  var way_val_y = -1;

  var pos_x = 0;
  var pos_y = 0;
  for (var nav of input_table) {
      var instruct = nav.split("")[0];
      var val = parseInt(nav.substr(1));
      switch(instruct)
      {
        case 'N':
        {
          way_val_y -= val;
        }break;
        case 'S':
        {
          way_val_y += val;
        }break;
        case 'E':
        {
          way_val_x += val;
        }break;
        case 'W':
        {
          way_val_x -= val;
        }break;
        case 'R':
        {
          val /= 90;
          var evens = parseInt(val/2);
          if(evens % 2 == 1)
          {
            way_val_x *= -1;
            way_val_y *= -1;
          }
          if(val % 2 == 1)
          {
            var temp = way_val_x;
            way_val_x = way_val_y*-1;
            way_val_y = temp;
          }
        }break;
        case 'L':
        {
          val /= 90;
          var evens = parseInt(val/2);
          if(evens % 2 == 1)
          {
            way_val_x *= -1;
            way_val_y *= -1;
          }
          if(val % 2 == 1)
          {
            var temp = way_val_x;
            way_val_x = way_val_y;
            way_val_y = temp*-1;
          }
        }break;
        case 'F':
        {
          pos_x += val*way_val_x;
          pos_y += val*way_val_y;
        }break;
      }
      //console.log(nav);
      //console.log("pos x: " + pos_x + " pos_y: " + pos_y);
      //console.log("way_pos_x: " + way_val_x + " way_pos_y: " + way_val_y);
  }
  if(pos_x < 0) pos_x *= -1;
  if(pos_y < 0) pos_y *= -1;

  return pos_x + pos_y;
}


function input_day()
{
  input_table = document.getElementById("result").innerHTML.split("\n").map(x => x.trim());
  console.log(part1(input_table));
  console.log(part2(input_table));


}
// 14:50

// 15:14 part1

// 16:05 part2
