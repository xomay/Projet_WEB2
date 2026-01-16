package game.controller;

import game.controller.dto.MapDTO;
import game.model.Map;
import game.service.MapService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MapControllerTest {
    @Mock
    private MapService mapService;

    @InjectMocks
    private MapController mapController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testMaps() {
        Map map1 = new Map();
        Map map2 = new Map();
        when(mapService.findAllMaps()).thenReturn(Arrays.asList(map1, map2));
        ResponseEntity<Iterable<Map>> response = mapController.maps();
        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
    }

    @Test
    void testMapFound() {
        Map map = new Map();
        when(mapService.findMap(1L)).thenReturn(Optional.of(map));
        ResponseEntity<Map> response = mapController.map(1L);
        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
    }

    @Test
    void testMapNotFound() {
        when(mapService.findMap(2L)).thenReturn(Optional.empty());
        ResponseEntity<Map> response = mapController.map(2L);
        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    void testMapDeleteFoundSuccess() {
        Map map = new Map();
        when(mapService.findMap(1L)).thenReturn(Optional.of(map));
        when(mapService.removeMap(1L)).thenReturn(true);
        ResponseEntity<Map> response = mapController.mapdelete(1L);
        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
    }

    @Test
    void testMapDeleteFoundFailed() {
        Map map = new Map();
        when(mapService.findMap(1L)).thenReturn(Optional.of(map));
        when(mapService.removeMap(1L)).thenReturn(false);
        ResponseEntity<Map> response = mapController.mapdelete(1L);
        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    void testMapDeleteNotFound() {
        when(mapService.findMap(2L)).thenReturn(Optional.empty());
        ResponseEntity<Map> response = mapController.mapdelete(2L);
        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    void testPost() {
        MapDTO dto = new MapDTO("map1", "plain,tree");
        Map map = new Map();
        when(mapService.addMapDTO(dto)).thenReturn(map);
        ResponseEntity<Map> response = mapController.post(dto);
        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
    }
}

