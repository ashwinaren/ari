public class JSONGeneratorSample{

    public class A { 
        String str;
        
        public A(String s) { str = s; }
    }

    public static string generateJSONContent() {
        // Create a JSONGenerator object.
        // Pass true to the constructor for pretty print formatting.
        JSONGenerator gen = JSON.createGenerator(true);
        
        // Create a list of integers to write to the JSON string.
        List<integer> intlist = new List<integer>();
        intlist.add(1);
        intlist.add(2);
        intlist.add(3);
        
        // Create an object to write to the JSON string.
        A x = new A('X');
        
        // Write data to the JSON string.
       /* gen.writeStartObject();
        gen.writeNumberField('abc', 1.21);
        gen.writeStringField('def', 'xyz');
        gen.writeFieldName('ghi');
        gen.writeStartObject();
        
        gen.writeObjectField('aaa', intlist);
        
        gen.writeEndObject();
        
        gen.writeFieldName('Object A');
        
        gen.writeObject(x);
        
        gen.writeEndObject();
        
        // Get the JSON string.
        String pretty = gen.getAsString();
        system.debug(' json -- '+pretty);
        System.assertEquals('{\n' +
        '  "abc" : 1.21,\n' +
        '  "def" : "xyz",\n' +
        '  "ghi" : {\n' +
        '    "aaa" : [ 1, 2, 3 ]\n' +
        '  },\n' +
        '  "Object A" : {\n' +
        '    "str" : "X"\n' +
        '  }\n' +
        '}', pretty);*/
        gen.writeStartObject();
        gen.writeFieldName('location');
        gen.writeStartObject();
        gen.writeObjectField('Street','Bus Sta Upas');
        gen.writeObjectField('City','Bengaluru');
        gen.writeObjectField('State','Karnataka');
        gen.writeEndObject();
        gen.writeFieldName('title');
        gen.writeStartObject();
        gen.writeObjectField('title','Majestic Bus Stand');
        gen.writeObjectField('description','Majestic');
        gen.writeEndObject();
        String pretty = gen.getAsString();
        system.debug(' json -- '+pretty);
        
        return pretty;
    }
}