function point(min,max)
{
  this.min = min;
  this.max = max;
}

var incorrect_indexes = [];

function part1(input_table)
{
  var ranges = [];
  var iterator = 0;
  var range = input_table[iterator];
  while(range != "")
  {
    var numbers_string = range.split(":")[1];
    var only_numbers = numbers_string.split(/,|or|-|\\s/).map(x => x.trim());
    ranges.push(new point(only_numbers[0],only_numbers[1]));
    ranges.push(new point(only_numbers[2],only_numbers[3]));
    ++iterator;
    range = input_table[iterator];
  }
  // optimise ranges
  var compare_item = 0;
  var range_iterator = 1;
  var elements_ammount = ranges.length;
  var splited = true;
  while(splited)
  {
    if(range_iterator == elements_ammount)
    {
      ++compare_item;
      range_iterator = compare_item+1;
      if(compare_item+1 == elements_ammount) splited = false;
    }
    else if(ranges[range_iterator].min >= ranges[compare_item].min &&
            ranges[range_iterator].min <= ranges[compare_item].max)
            {
              if(ranges[range_iterator].max >= ranges[compare_item].max) ranges[compare_item].max = ranges[range_iterator].max;
              ranges.splice(range_iterator, 1);
              compare_item = 0;
              range_iterator = 1;
              elements_ammount = ranges.length;
            }
    else {
      ++range_iterator;
    }
  }
  var invalid_numbers = 0
  range = input_table[iterator];
  while(range != "nearby tickets:")
  {
    ++iterator;
    range = input_table[iterator];
  }
  ++iterator;
  for(var a = iterator; a < input_table.length; a++)
  {
    var numbers_list = input_table[a].split(",").map(x => parseInt(x));
    for(var b = 0; b < numbers_list.length; b++)
    {
      if(!(numbers_list[b] >= ranges[0].min && numbers_list[b] <= ranges[0].max))
      {
        invalid_numbers += numbers_list[b];
        if(!incorrect_indexes.includes(a)) incorrect_indexes.push(a);
      }
    }
  }

  return invalid_numbers;
}
function part2(input_table)
{
  for(var a = incorrect_indexes.length-1; a >=0; a--)
  {
    input_table.splice(incorrect_indexes[a],1);
  }
  var list_of_fields = [];
  var iterator = 0;
  var range = input_table[iterator];
  while(range != "")
  {
    var field_name = range.split(":")[0];
    var numbers_string = range.split(":")[1];
    var only_numbers = numbers_string.split(/,|or|-|\\s/).map(x => x.trim()).map(x => parseInt(x));
    var first_range = new point(only_numbers[0],only_numbers[1]);
    var second_range = new point(only_numbers[2],only_numbers[3]);

    list_of_fields.push(new Array(field_name, first_range, second_range, -1));
    ++iterator;
    range = input_table[iterator];
  }
  var numbers = [];
  iterator +=2;
  numbers.push(input_table[iterator].split(",").map(x => parseInt(x)));
  iterator +=3;
  for(var a = iterator; a<input_table.length; a++) numbers.push(input_table[a].split(",").map(x => parseInt(x)));


  var reserved_columns = [];
  var actual_column = -1;
  for(var b = 0; b < list_of_fields.length; b++)
  {
    if(list_of_fields[b][3] != -1) continue;
    //console.log("checking element: " + b);
    for(var c = 0; c < numbers[0].length; c++)
    {
      if(reserved_columns.includes(c)) continue;
      for(var d = 0; d < numbers.length; d++)
      {
        if(!(numbers[d][c] >= list_of_fields[b][1].min && numbers[d][c] <= list_of_fields[b][1].max) &&
           !(numbers[d][c] >= list_of_fields[b][2].min && numbers[d][c] <= list_of_fields[b][2].max))
           {
             //console.log("incorrect");
             break;
           }
        else if(d+1 == numbers.length)
        {
          actual_column = c;
        }
      }
      if(list_of_fields[b][3] == -1 && actual_column != -1) list_of_fields[b][3] = actual_column;
      else if(list_of_fields[b][3] != -1 && actual_column != list_of_fields[b][3])
      {
        //console.log("element: " + b + "pasuje wiecej niz jedna kolumna. Aktualna: " + list_of_fields[b][3] + ": nowo znaleziona" + actual_column);
        actual_column = -1;
        list_of_fields[b][3] = -1;
        break;
      }
    }
    if(list_of_fields[b][3] != -1)
    {
      //console.log("element: " + b + "znaleziono pasujaca kolumne - " + list_of_fields[b][3]);
      actual_column = -1;
      reserved_columns.push(list_of_fields[b][3]);
      b = -1;
    }
  }

  var numbers_of_departures = [];
  var return_value = 1;
  for(var e = 0; e < list_of_fields.length; e++)
  {
    if(list_of_fields[e][0].includes("departure"))
    {
      return_value *= numbers[0][list_of_fields[e][3]];
    }
    //numbers_of_departures.push(list_of_fields[e][3]);
  }
  return return_value;
  //console.log(numbers_of_departures);
  //console.log(reserved_columns);


  //console.log(list_of_fields);

}
function input_day()
{
  input_table = document.getElementById("result").innerHTML.split("\n").map(x => x.trim());
  //console.log(input_table);
  console.log(part1(input_table));
  //console.log(incorrect_indexes);
  console.log(part2(input_table));

}
// 13:15

// 14:12 part1 (check for loop that optimise ranges - for some reason there are 3 objects, but 2 of them are incorrect)

// 17:22 part2 (I think solution is so complicated)
